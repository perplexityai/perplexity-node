BASE_COMPILER_OPTIONS = {
    "alwaysStrict": True,
    "esModuleInterop": True,
    "exactOptionalPropertyTypes": True,
    "forceConsistentCasingInFileNames": True,
    "lib": [
        "ES2020",
        "DOM",
        "DOM.Iterable",
    ],
    "module": "Node16",
    "moduleResolution": "Node16",
    "noEmit": True,
    "noImplicitAny": True,
    "noImplicitOverride": True,
    "noImplicitReturns": True,
    "noImplicitThis": True,
    "noPropertyAccessFromIndexSignature": True,
    "noUncheckedIndexedAccess": True,
    "resolveJsonModule": True,
    "skipLibCheck": True,
    "strict": True,
    "strictBindCallApply": True,
    "strictFunctionTypes": True,
    "strictNullChecks": True,
    "strictPropertyInitialization": True,
    "target": "ES2020",
    "types": [
        "node",
        "mocha",
    ],
}

TSCONFIG = {
    "compilerOptions": BASE_COMPILER_OPTIONS,
    "exclude": [],
    "include": [
        "src",
        "examples",
    ],
}
