import l from 'leaflet';
import c from 'leaflet/dist/images/marker-icon.png';
import o from 'leaflet/dist/images/marker-icon-2x.png';
import b from 'leaflet/dist/images/marker-shadow.png';

function a(t={}){l.Icon.Default.mergeOptions({iconUrl:c,iconRetinaUrl:o,shadowUrl:b,...t});}var r=a;

export { r as setDefaultIcon };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map