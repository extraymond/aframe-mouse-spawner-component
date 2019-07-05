import AFRAME from "aframe"
import "aframe-mouse-dragndrop-component"
AFRAME.registerComponent("spawner", {
  dependencies: ["track-cursor"],
  schema: {
    distance: { type: "int", default: 3 },
    enabled: { type: "bool", default: false },
    template: { type: "selector", default: null }
  },
  init: function() {
    this.scene = this.el.sceneEl;
    this.camera = this.scene.camera.el;
    document.addEventListener("dblclick", () => {
      if (this.data.enabled) {
        if (!this.el.is("cursor-hovering")) {
          let direction = this.scene
            .getAttribute("raycaster")
            .direction.clone();
          let target = this.camera.object3D.position
            .clone()
            .add(direction.multiplyScalar(this.data.distance));

          let el;
          if (this.data.template) {
            el = this.data.template.cloneNode();
            el.removeAttribute("id")
          } else {
            el = document.createElement("a-entity");
            el.setAttribute("geometry", { primitive: "sphere" });
            el.setAttribute("material", { color: "red" });
          }
          el.setAttribute("position", target.clone());
          el.setAttribute("dragndrop", {});
          el.setAttribute("visible", true)
          this.el.appendChild(el);
        }
      }
    });
  }
});