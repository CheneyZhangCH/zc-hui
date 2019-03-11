// icons 批量加载
// TODO: 考虑替换tsx，但是需要各种类型要求，待验证
let importAll = (requireContext) => requireContext.keys().forEach(requireContext);
try {
  importAll(require.context('./icons/', true, /\.svg$/));
} catch (error) {
}
