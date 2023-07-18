import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import OrgChart from "@balkangraph/orgchart.js";
import { JobService } from '../../services/job.service';

OrgChart.templates['ula'].size = [450, 150];
OrgChart.templates['ula']['field_0'] = '<text style="font-size: 18px;" x="120" y="40" class="field_0">{val}</text>';
OrgChart.templates['ula']['field_1'] = '<text style="font-size: 12px;" class="field_1" x="120" y="80">{val}</text>';
OrgChart.templates['ula'].node = '<rect filter="url(#cool-shadow)"  x="0" y="0" height="150" width="450" fill="#ffffff" stroke-width="1" stroke="#eeeeee" rx="10" ry="10"></rect>';
OrgChart.SEARCH_PLACEHOLDER = "Buscar cargo";
OrgChart.templates['ula'].editFormHeaderColor = '#023E8A';

@Component({
  selector: 'app-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.css']
})
export class OrgchartComponent {
  organizationData: any[] = []
  constructor(private readonly jobService: JobService) {
  }

  ngOnInit(): void {
    this.jobService.getOrganization().subscribe(data => {
      this.organizationData = data
    })
  }
  tabChange(event: MatTabChangeEvent) {
    const tree = document.getElementById(`s${event.index}`);
    if (tree) {
      const chart = new OrgChart(tree, {
        template: "ula",
        editForm: {
          readOnly: true,
          generateElementsFromFields: false,
          titleBinding: undefined,
          elements: [
            { type: 'textbox', label: 'Funcionario', binding: 'name' },
            { type: 'textbox', label: 'Cargo', binding: 'title', btn: 'Upload' }
          ],
          buttons: {
            edit: null,
            share: null,
            pdf: null
          },
        },
        miniMap: true,
        nodeBinding: {
          field_0: "name",
          field_1: "title",
          img_0: "img",
          size: 'small'
        },
      });
      chart.load(this.organizationData[event.index].data)
    }
  }

}
