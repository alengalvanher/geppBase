import { Component, OnInit } from '@angular/core';
import { SidenavService } from "./../../servicios/sidenav.service";
import { fromEvent, Observable, Subscription } from "rxjs";

// TREE 1
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';


// TREE 2
interface MenuNode {
	type: string;
	name: string;
	enlace?: string;
	disabled?: boolean;
	icon: string;
	sub?: boolean;
	isLink?: boolean;
	children?: MenuNode[];
	reset?: string;
}



// TREE 3
const TREE_DATA: MenuNode[] = [
	// {
	// 	type: 'enlaceUno',
	// 	name: 'Inicio',
	// 	disabled: true,
	// 	enlace: '/inventario/carga',
	// 	icon: 'icon-home'
	// },
	{
		type: 'submenuUno',
		name: 'Inventario',
		icon: 'icon-inventario',
		children: [
			{ type: 'enlaceDos', name: 'Carga', icon: '', isLink: true, enlace: '/inventario/carga', reset: "false" },
			{ type: 'enlaceDos', name: 'Registro', icon: '', isLink: true, enlace: '/inventario/registro', reset: "true" },
			{ type: 'enlaceDos', name: 'Consulta', icon: '', isLink: true, enlace: '/inventario/consulta', reset: "false" }
		],
	},
	{
		type: 'submenuUno',
		name: 'Combustibles',
		enlace: '',
		icon: 'icon-combustibles',
		children: [
			{ type: 'enlaceDos', name: 'Cargas', icon: '', enlace: '/combustibles/carga', reset: "false"  },
			// { type: 'enlaceDos', name: 'Dispersión de combustible', icon: '', enlace: '/combustibles/dispersion', reset: "false"  },
			{ type: 'enlaceDos', name: 'Conciliación', icon: '', enlace: '/combustibles/conciliacion', reset: "false"  }
		],
	},
	{
		type: 'submenuUno',
		name: 'Neumáticos',
		enlace: '',
		icon: 'icon-neumaticos',
		children: [
			// {
			// 	type: 'enlaceDos',
			// 	name: 'Registro',
			// 	icon: '',
			// 	enlace: '/neumaticos/registro'
			// },
			{
				type: 'submenuDos',
				name: 'Inventario',
				icon: '',
				children: [
					{ type: 'enlaceTres', name: 'En uso', icon: '', enlace: '/neumaticos/en-uso' },
					// { type: 'enlaceTres', name: 'En almacén', icon: '', enlace: '/neumaticos/en-almacen' },
				]
			},
			// {
			// 	type: 'enlaceDos',
			// 	name: 'Solicitud',
			// 	icon: '',
			// 	enlace: '/neumaticos/solicitud'
			// }
		],
	},
];



// TREE 4
interface itemMenuNode {
	expandable: boolean;
	type: string;
	name: string;
	icon: string;
	isSubmenu?: boolean;
	enlace: string;
	level: number;
	children?: any;
}



@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	// RESIZE
	resizeObservable$: Observable<Event>;
	resizeSubscription$: Subscription;


	// TREE 5
	private _transformer = (node: MenuNode, level: number) => {
		return {
			expandable: !!node.children && node.children.length > 0,
			type: node.type,
			name: node.name,
			disabled: node.disabled,
			icon: node.icon,
			sub: node.sub,
			enlace: node.enlace,
			level: level,
		};
	};

	// TREE 6
	treeControl = new FlatTreeControl<any>(
		node => node.level,
		node => node.expandable,
	);



	// TREE 7
	treeFlattener = new MatTreeFlattener(
		this._transformer,
		node => node.level,
		node => node.expandable,
		node => node.children,
	);

	// TREE 8
	dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);


	value: string = "";
	sideNavClass = "menu-open";






	constructor(private _sidenavService: SidenavService) {


		// TREE 9
		this.dataSource.data = TREE_DATA;

		this._sidenavService.sideNavState.subscribe(classReturned => {
			this.treeControl.collapseAll();

			console.log("Returna", classReturned);

			if (classReturned == 'closed') {
				this.sideNavClass = 'menu-open';
			} else if (classReturned == 'open') {
				this.sideNavClass = 'menu-closed';
			} else {
				this.sideNavClass = 'menu-open';
			}
		})

	}


	// TREE 10
	hasChild = (_: number, node: itemMenuNode) => node.expandable;
	hasNoContent = (_: number, node: itemMenuNode) => node.children == null;
	isSubmenu = (_: number, node: itemMenuNode) => node.isSubmenu;
	levelNone = (_: number, node: itemMenuNode) => node.level == 0;
	levelOne = (_: number, node: itemMenuNode) => node.level == 1;
	levelTwo = (_: number, node: itemMenuNode) => node.level == 2;

	submenuDos = (_: number, node: itemMenuNode) => node.type == 'submenuDos';
	enlaceDos = (_: number, node: itemMenuNode) => node.type == 'enlaceDos';

	enlaceUno = (_: number, node: itemMenuNode) => node.type == 'enlaceUno';
	submenuUno = (_: number, node: itemMenuNode) => node.type == 'submenuUno';

	openSubmenu(item: any) {
		this.value = item;
	}


	ngOnInit(): void {

		// onResize
		this.resizeObservable$ = fromEvent(window, 'resize')
		this.resizeSubscription$ = this.resizeObservable$.subscribe(evt => {
			console.log('event: ', evt.target['innerWidth'])
			let width = evt.target['innerWidth'];

			if (width > 780) {
				this.sideNavClass = 'menu-open';
			} else if (width < 781) {
				this.sideNavClass = 'menu-closed';
				this.treeControl.collapseAll();
			} else {
				this.sideNavClass = 'menu-open';
			}

		})


	}


	mouseEnter() {
		this.sideNavClass = 'menu-open';
	}

	mouseLeave() {
		// this._sidenavService.sideNavState.subscribe(classReturned => {
		// 	this.treeControl.collapseAll();

		// 	if (classReturned == 'menu-closed') {
		// 		this.sideNavClass = 'menu-open';
		// 	}
		// })
	}


	linkClicked(element) {
		if( element == '/inventario/registro' ) {
			window.sessionStorage.clear();
		}

	}
}
