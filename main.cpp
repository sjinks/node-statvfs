#define NAPI_VERSION 2
#include <string>
#include <memory>
#include <uv.h>
#include <node_api.h>
#include <napi.h>

struct CallbackData {
    uv_fs_t request;
    Napi::Promise::Deferred deferred;

    CallbackData(Napi::Env env): request(), deferred(env)
    {}

    ~CallbackData()
    {
        uv_fs_req_cleanup(&this->request);
    }
};

static void statvfs_callback(uv_fs_t* req)
{
    std::unique_ptr<CallbackData> data(static_cast<CallbackData*>(req->data));
    const Napi::Env env = data->deferred.Env();
    Napi::HandleScope scope(env);

    if (req->result < 0) {
        napi_value error;
        napi_create_error(env, Napi::Value::From(env, uv_err_name(req->result)), Napi::Value::From(env, uv_strerror(req->result)), &error);

        Napi::Object err(env, error);
        err.Set("errno", Napi::Value::From(env, req->result));
        err.Set("path", Napi::Value::From(env, req->path));
        data->deferred.Reject(err);
        return;
    }

    const uv_statfs_t* stat = static_cast<const uv_statfs_t*>(req->ptr);
    Napi::Object obj = Napi::Object::New(env);
    obj.Set("type", Napi::Value::From(env, stat->f_type));
    obj.Set("bsize", Napi::Value::From(env, stat->f_bsize));
    obj.Set("blocks", Napi::Value::From(env, stat->f_blocks));
    obj.Set("bfree", Napi::Value::From(env, stat->f_bfree));
    obj.Set("bavail", Napi::Value::From(env, stat->f_bavail));
    obj.Set("files", Napi::Value::From(env, stat->f_files));
    obj.Set("ffree", Napi::Value::From(env, stat->f_ffree));
    data->deferred.Resolve(obj);
}

static Napi::Value statVFS(const Napi::CallbackInfo& info)
{
    const Napi::String path = info[0].ToString();
    const std::string spath = path;

    uv_loop_s* event_loop;
    napi_get_uv_event_loop(info.Env(), &event_loop);

    CallbackData* data = new CallbackData(info.Env());
    data->request.data = data;
    uv_fs_statfs(event_loop, &data->request, spath.c_str(), statvfs_callback);
    return data->deferred.Promise();
}

static Napi::Object Init(Napi::Env env, Napi::Object exports)
{
    exports.Set("statvfs", Napi::Function::New(env, statVFS));
    return exports;
}

NODE_API_MODULE(statvfs, Init)
