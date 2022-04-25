{
  "targets": [
    {
      "target_name": "node_statvfs",
      "sources": [
        "main.cpp"
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      'conditions': [
        ["OS=='win'", {
          "defines": [
            "_HAS_EXCEPTIONS=1"
          ],
          "msvs_settings": {
            "VCCLCompilerTool": {
              "ExceptionHandling": 1
            },
          },
        }],
        ["OS=='mac'", {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'CLANG_CXX_LIBRARY': 'libc++',
            'MACOSX_DEPLOYMENT_TARGET': '10.7',
          },
        }],
      ],
      "cflags+": [
        "-fvisibility=hidden",
        "-std=gnu++11"
      ],
      "include_dirs": [
        "<!(node -p \"require('node-addon-api').include_dir\")"
      ],
      "defines": [
        "NODE_ADDON_API_DISABLE_DEPRECATED",
        "NAPI_VERSION=<(napi_build_version)"
      ],
      "xcode_settings": {
        "GCC_ENABLE_CPP_EXCEPTIONS": "YES"
      }
    }
  ]
}
