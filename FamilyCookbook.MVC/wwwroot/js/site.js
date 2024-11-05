"use strict";
const enableTableSort = () => {
};
Array
    .from(document.getElementsByTagName("table"))
    .filter(table => table.attributes.getNamedItem('data-sortable')?.value === 'true')
    .forEach(table => {
    console.log(table.id);
});
//# sourceMappingURL=site.js.map