import { AfterViewInit, Component, OnInit, NgZone } from '@angular/core';
import { NeumaticosService } from "@servicios/neumaticos/neumaticos.service"
import { EChartsOption } from 'echarts';


@Component({
    selector: 'app-en-uso',
    templateUrl: './en-uso.component.html',
    styleUrls: ['./en-uso.component.scss']
})
export class EnUsoComponent implements OnInit, AfterViewInit {
    cedis: string = 'BAAG';
    displayedColumns: any;
    displayedColumnsArray: any;
    dataSource: any
    dataHeaders: any;
    totalMiniDashboard: any;
    graphMiniDashboardPie: any = [{}];
    graphMiniDashboardBar: any = [];
    chartPieOption:EChartsOption
    chartBarOption:EChartsOption
    dateFilter:any = {}
    showFiller = false;
    responseTiresToChange:any
    response:any
    tableFlag: boolean = false

    tires4Change:number[] = [];
    tires4ChangeUrgent:number = 0;
    dataSource4Change:any[] = [];
    dataSourceUrgent:any[] = [];
    dataBackup:any [] = [];

    filterObject = {
		"Year": null,
		"Week": null,
		"STARTDATE": null,
		"ENDDATE": null,
		"Month": null,
		"Cedis": this.cedis,
		"RegionList": [],
		"EcoIdentifier": null,
		"StartLastMeasureDate": null,
		"EndLastMeasureDate": null
	};


    constructor(
        private neumaticosService: NeumaticosService,
        private _ngZone: NgZone
    ) {

        this.getTireInventory(this.filterObject)
    }
    ngAfterViewInit(): void {
    }

    getTireInventory(filterObj){
        this.neumaticosService.getTireInventory(filterObj).subscribe({
            next: (response: any) => {

                this.response = response

                console.log("this.response", response)

                this.dataSource = response.TireTable
                this.dataBackup = response.TireTable
                this.dataHeaders = response.TableHeaders
                this.displayedColumns = this.sendDisplayedColumns()
                this.totalMiniDashboard = response.TireInUse

                this.chartBarOption = this.construirDataBarChart(response)
                this.chartPieOption = this.construirDataDonutChart(response)

                this.tires4Change = this.countTireChanges(response.TireTable)

                this._ngZone.run(() => {
                    let aux = response.PhysicalDamages.map(({ PhysicalDamage, Total }) => ({ value: Total, name: PhysicalDamage }))
                    this.graphMiniDashboardPie = aux
                })

                this.graphMiniDashboardBar = response.TireWears
            },
            error: (error) => console.log("Error", error),
            complete: () => {
                this.tableFlag = true
            }

        })
    }

    sendDisplayedColumns() {
        var aux = ['Acciones', 'Region', 'Economico', 'LastReviewDate'], res
        var tableDataArray = [
            {
                "ParentHeader": "Acciones",
                "ChildHeaders": []
            },
            {
                "ParentHeader": "Region",
                "ChildHeaders": []
            },
            {
                "ParentHeader": "Economico",
                "ChildHeaders": []
            },
            {
                "ParentHeader": "LastReviewDate",
                "ChildHeaders": []
            }
        ]
        this.dataHeaders.map(function (value) {
            //console.log(value)
            aux.push(value.ParentHeader+'-'+value.ChildHeaders[0])

            value.ParentHeader = value.ParentHeader+'-'+value.ChildHeaders[0]
            value.ChildHeaders[0] = 'MM'
            tableDataArray.push(value)

            res = [...new Set(aux)];
        });
        //console.log(tableDataArray)
        return { displayedColumns: res, displayedColumnsArray: tableDataArray };
    }

    receivingDate($event) {
        this.resetDateFilter(this.filterObject)
        if('Week' in $event){
            this.filterObject['Week'] = $event.Week
            this.filterObject['Year'] = $event.Year
        }if('Month' in $event){
            this.filterObject['Month'] = $event.Month
            this.filterObject['Year'] = $event.Year
        }if('StartDate' in $event){
            this.filterObject['STARTDATE'] = $event.StartDate
            this.filterObject['ENDDATE'] = $event.EndDate
        }
        this.getTireInventory(this.filterObject)

    }

    resetDateFilter(data){
        data.Year = null
        data.Month = null
        data.Week = null
        data.STARTDATE = null
        data.ENDDATE = null
    }

    ngOnInit(): void {

    }


    dateRecall($event){
        //console.log('hasta afuera',$event)
		this.filterObject.StartLastMeasureDate = $event[0];
		this.filterObject.EndLastMeasureDate = $event[1];
		// this.getInventory(this.filterObject)
	}



    construirDataDonutChart(data): EChartsOption {
        let newData = []

        data.PhysicalDamages.map( item => {
            newData.push({
                value: item.Total,
                name: item.PhysicalDamage
            })
        })


        return {
            color: ['#FECA57', '#54A0FF', '#1DD1A1', '#FF8A65', '#224EDF'],
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                right: 1,
                top: 'center',
            },
            series: [
                {
                    name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    center: ['25%', '50%'],
                    itemStyle: {
                        borderColor: '#fff',
                        borderWidth: 2,
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: 20,
                            fontWeight: 200
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: newData
                }
            ]
        }

    }
    construirDataBarChart(data): EChartsOption {
        let newData = []

        data.PhysicalDamages.map( item => {
            newData.push({
                value: item.Total,
                name: item.PhysicalDamage
            })
        })


        //console.log("Esta data dentro de la función", newData)

        return {
            color: ['#224EDF', '#AFBFF4'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                height: "60%",
                top: "10%",
                right: "10%"
            },
            xAxis: {
                type: 'category',
                data: ['3', '4', '5', '6', '8'],
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: [8, 0, 3, 4],
                    type: 'bar',
                    itemStyle: {
                        borderRadius: [30, 30, 30, 30]

                    }
                }
            ]
        }

    }

    tireChangeFilter($event){
        //console.log($event)
        if($event === 'Cambio urgente'){
            this.dataSource = this.dataSource4Change
        }if($event === 'Cambio'){
            this.dataSource = this.dataSourceUrgent
        }if($event === 'Todos'){
            this.dataSource = this.dataBackup
        }

    }
    countTireChanges(data){
        let tires4Change = 0, tires4ChangeUrgent = 0, optimumTire = 0
        data.forEach((element) => {
            element.TireDetailsList.forEach((item) => {
                //item.TireCondition === 'Cambio urgente'? tires4ChangeUrgent ++ : item.TireCondition === 'Cambio'? tires4ChangeUrgent ++ : optimumTire ++

                if(item.TireCondition === 'Cambio urgente'){
                    tires4ChangeUrgent ++
                    this.dataSource4Change.push(element)
                }if(item.TireCondition === 'Cambio'){
                    tires4Change ++
                    this.dataSourceUrgent.push(element)
                }else{
                    optimumTire ++
                }
              });
              //console.log(this.dataSource4Change, this.dataSourceUrgent)
              this.dataSource4Change = [...new Set(this.dataSource4Change)];
              this.dataSourceUrgent = [...new Set(this.dataSourceUrgent)];
          });
        return [tires4Change,tires4ChangeUrgent, optimumTire]
    }

    pillsGrandparent($event){
        //console.log($event)
        this.getTireInventory($event)
    }
}
