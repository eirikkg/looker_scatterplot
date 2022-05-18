constant: vis_id {
  value: "amedia_scatter_id"
  export: override_optional
}
constant: vis_label {
  value: "Amedia Distribusjon Scatterplot"
  export: override_optional
}
visualization: {
  id: "@{vis_id}"
  label: "@{vis_label}"
  file: "script.js"
  dependencies: []
}
