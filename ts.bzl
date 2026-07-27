load("@aspect_bazel_lib//lib:copy_to_bin.bzl", "copy_to_bin")

def _sources(name, srcs, **kwargs):
    attrs = {
        "name": name,
        "srcs": srcs,
    }
    for attr in ["tags", "testonly", "visibility"]:
        if attr in kwargs:
            attrs[attr] = kwargs[attr]

    copy_to_bin(**attrs)

def ts_library(name, srcs, **kwargs):
    _sources(name, srcs, **kwargs)

def ts_test(name, srcs, **kwargs):
    _sources(name, srcs, testonly = True, **kwargs)
