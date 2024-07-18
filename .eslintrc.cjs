module.exports = {
  root: true,
  env: { browser: true, es2020: true }, // 브라우자, ES2020 환경 설정
  extends: [
    "eslint:recommended", // ESLint의 기본 권장 규칙 사용
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"], // ESLint를 무시할 파일 및 디렉토리
  parserOptions: { ecmaVersion: "latest", sourceType: "module" }, // 구문 분석기 설정
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    "no-var": "error", // var 금지
    "no-multiple-empty-lines": "error", // 여러 공백 줄 금지
    "dot-notation": "warn", // 가능하면 dot notation 사용
    "no-unused-vars": "warn", // 사용하지 않는 변수 금지
    "react/jsx-key": "error", // 반복문으로 생성하는 요소에 key 강제
    "react/jsx-pascal-case": "warn", // 컴포넌트명은 Pascal Case
    "react/no-direct-mutation-state": "warn", // state 수정 금지
    "react/jsx-no-useless-fragment": "warn", // 불필요한 fragment 금지
    "react/no-unused-state": "warn", // 사용하지 않는 state 금지
    "react/self-closing-comp": "warn", // 셀프 클로징 태그 가능하면 적용
    "react/jsx-curly-brace-presence": "warn", // jsx 내 불필요한 중괄호 금지
    "react-refresh/only-export-components": [
      "warn", // React 컴포넌트는 컴포넌트만을 export할 것을 강제
      { allowConstantExport: true },
    ],
  },
};
