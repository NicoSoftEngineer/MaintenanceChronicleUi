import { AbstractControl, FormGroup } from "@angular/forms";

// Generate a JSON Patch array with changed fields
export function getJsonPatch(updatedFrom: FormGroup, originalModel: any): any[] {
  let patchArray: any[] = [];

  Object.keys(updatedFrom.value).forEach((key) => {
    if (updatedFrom.get(key)?.value !== originalModel[key] && originalModel[key]) {
      patchArray.push({
        path: key,
        op: 'replace',
        value: updatedFrom.get(key)?.value,
      });
    }
  });

  return patchArray;
}
