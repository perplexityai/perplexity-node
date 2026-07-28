load("@aspect_rules_js//js:defs.bzl", "js_test")

def live_tests():
    for name in [
        "async_chat_completion",
        "chat_completion",
        "contextualized_embeddings",
        "embeddings",
        "responses",
        "search",
        "streaming_chat",
        "streaming_responses",
    ]:
        js_test(
            name = name,
            data = [
                "helpers.ts",
                ":typecheck",
                "//:node_modules/@perplexity-ai/perplexity_ai",
                "//:node_modules/published-sdk",
            ],
            entry_point = name.replace("_", "-") + ".spec.ts",
            tags = [
                "functional_test",
                "manual",
            ],
        )
