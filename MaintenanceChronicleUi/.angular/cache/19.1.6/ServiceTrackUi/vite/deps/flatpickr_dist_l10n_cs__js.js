import {
  __commonJS
} from "./chunk-3OV72XIM.js";

// node_modules/flatpickr/dist/l10n/cs.js
var require_cs = __commonJS({
  "node_modules/flatpickr/dist/l10n/cs.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, factory(global.cs = {}));
    })(exports, function(exports2) {
      "use strict";
      var fp = typeof window !== "undefined" && window.flatpickr !== void 0 ? window.flatpickr : {
        l10ns: {}
      };
      var Czech = {
        weekdays: {
          shorthand: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So"],
          longhand: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota"]
        },
        months: {
          shorthand: ["Led", "Ún", "Bře", "Dub", "Kvě", "Čer", "Čvc", "Srp", "Zář", "Říj", "Lis", "Pro"],
          longhand: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"]
        },
        firstDayOfWeek: 1,
        ordinal: function() {
          return ".";
        },
        rangeSeparator: " do ",
        weekAbbreviation: "Týd.",
        scrollTitle: "Rolujte pro změnu",
        toggleTitle: "Přepnout dopoledne/odpoledne",
        amPM: ["dop.", "odp."],
        yearAriaLabel: "Rok",
        time_24hr: true
      };
      fp.l10ns.cs = Czech;
      var cs = fp.l10ns;
      exports2.Czech = Czech;
      exports2.default = cs;
      Object.defineProperty(exports2, "__esModule", {
        value: true
      });
    });
  }
});
export default require_cs();
//# sourceMappingURL=flatpickr_dist_l10n_cs__js.js.map
