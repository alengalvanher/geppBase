// TREE 2
export interface MenuNode {
	type: string;
	name: string;
    imagen: string;
	enlace?: string;
	disabled?: boolean;
	icon: string;
	sub?: boolean;
	isLink?: boolean;
	children?: MenuNode[];
	reset?: string;
}


export  const menuData: any[] = [
	// {
	// 	type: 'enlaceUno',
	// 	name: 'Inicio',
	// 	disabled: true,
	// 	enlace: '/inventario/carga',
	// 	icon: 'icon-home'
	// },
	// {
	// 	type: 'enlaceUno',
	// 	name: 'Reportes',
    //     imagen: 'reportes',
	// 	icon: 'icon-reportes',
	// 	enlace: '',
    //     title: 'Reportes',
    //     badgeClass:'badge badge-sm bg-secondary badge-hide',
    //     badgeValue:'new',
    //     path: '/reportes',
    //     Menusub: false,
    //     active: true,
    //     headTitle: 'Reportes',
	// },
	{
		type: 'enlaceUno',
		name: 'Reportes',
        imagen: 'ic-reportes',
		icon: 'ic-reportes',
		enlace: '',
        title: 'Inventario',
        badgeClass:'badge badge-sm bg-secondary badge-hide',
        badgeValue:'new',
        path: '/inventario/carga',
        Menusub: false,
        active: true,
        
		// children: [
		// 	{ type: 'enlaceDos', name: 'Reportes', icon: '', isLink: true, enlace: '/inventario/carga', reset: "false" },
			// { type: 'enlaceDos', name: 'Registro', icon: '', isLink: true, enlace: '/inventario/registro', reset: "true" },
			// { type: 'enlaceDos', name: 'Consulta', icon: '', isLink: true, enlace: '/inventario/consulta', reset: "false" }
		//],
	},
	// {
	// 	type: 'submenuUno',
	// 	name: 'Combustibles',
    //     imagen: 'combustibles',
	// 	enlace: '',
	// 	icon: 'icon-combustibles',
    //     title: 'Combustible',
    //     badgeClass:'badge badge-sm bg-secondary badge-hide',
    //     badgeValue:'new',
    //     path: '/combustible',
    //     Menusub: true,
    //     active: false,
    //     headTitle: 'Inventario de Unidades',
	// 	children: [
	// 		{ type: 'enlaceDos', name: 'Cargas', icon: '', enlace: '/combustibles/carga', reset: "false", imagen: 'carga-icon'  },
	// 		// { type: 'enlaceDos', name: 'Dispersión de combustible', icon: '', enlace: '/combustibles/dispersion', reset: "false"  },
	// 		{ type: 'enlaceDos', name: 'Conciliación', icon: '', enlace: '/combustibles/conciliacion', reset: "false", imagen: 'doc-icon'  }
	// 	],
	// },
	// {
	// 	type: 'submenuUno',
	// 	name: 'Neumáticos',
    //     imagen: 'neumaticos',
	// 	enlace: '',
	// 	icon: 'icon-neumaticos',
    //     title: 'Combustible',
    //     badgeClass:'badge badge-sm bg-secondary badge-hide',
    //     Menusub: true,
    //     active: false,
    //     headTitle: 'Neumáticos',
	// 	children: [
			// {
			// 	type: 'enlaceDos',
			// 	name: 'Registro',
			// 	icon: '',
			// 	enlace: '/neumaticos/registro'
			// },
			// {
			// 	type: 'submenuDos',
			// 	name: 'Inventario en uso',
			// 	icon: '',
			// 	imagen: 'doc-icon',
			// 	enlace: '/neumaticos/en-uso',
                // Menusub: true,
				// children: [
				// 	{ type: 'enlaceTres', name: 'En uso', icon: '', enlace: '/neumaticos/en-uso', imagen: 'carga-icon' },
					// { type: 'enlaceTres', name: 'En almacén', icon: '', enlace: '/neumaticos/en-almacen' },
				// ]
			//},
			// {
			// 	type: 'enlaceDos',
			// 	name: 'Solicitud',
			// 	icon: '',
			// 	enlace: '/neumaticos/solicitud'
			// }
	// 	],
	// },
];
