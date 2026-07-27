load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

def _sources(name, srcs, testonly, **kwargs):
    attrs = {
        "name": name,
        "srcs": srcs,
        "testonly": testonly,
        "visibility": ["//visibility:public"],
    }
    for attr in ["tags", "visibility"]:
        if attr in kwargs:
            attrs[attr] = kwargs[attr]

    copy_to_bin(**attrs)

def ts_library(name, srcs, **kwargs):
    testonly = native.package_name() == "src/test"
    _sources(name, srcs, testonly, **kwargs)

    native.test_suite(
        name = "%s_typecheck" % name,
        tests = ["//:test_js_typecheck_test" if testonly else "//:library_typecheck_typecheck_test"],
    )

def ts_test(name, srcs, **kwargs):
    _sources("%s_sources" % name, srcs, True, **kwargs)

    native.test_suite(
        name = name,
        tests = [
            "//:test",
            "//:test_js_typecheck_test",
        ],
    )
