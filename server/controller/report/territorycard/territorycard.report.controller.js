const fs = require('fs');

module.exports = {
    getTerritoryCardHTML
};

var styleContent = "";
var headContent = "";

/*<table class="territoryCard">
    <tr>
        <td colspan="20">
            <table class="territoryCardHeader">
                <tr>
                    <td class="territoryCardHeadline" colspan="3">GEBIETSKARTEN</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="5"></td>
                    <td style="text-align: right">Muster:</td>
                    <td></td>
                    <td style="text-align: left">Name des Verk.</td>
                    <td colspan="2" class="proclaimerExample">S. Fleißig</td>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="7"></td>
                    <td style="text-align: left">ausgegeben am</td>
                    <td class="dateExampleFrom">07.11.2012</td>
                    <td class="dateExampleTo">08.03.2013</td>
                    <td>zurück am</td>
                    <td></td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td class="territoryColumn" *ngFor="let reportData of tableData">
                    <table>
            <thead class="columnHead">
                <tr class="territoryName">
                    <th colspan="2">{{ reportData.name }}</th>
                </tr>
                <tr class="territoryNumber">
                    <th>Nr.</th>
                    <th>{{ reportData.territoryNumber }}</th>
                </tr>
            </thead>
            <tbody class="columnBody">
                <tr *ngFor="let entry of reportData.entries" class="columnBodyEntry">
                                <td colspan="2">
                    <table class="reportentry">
                        <tr class="reportentryProclaimer">
                            <td colspan="2">{{ entry.proclaimerID.lastName | uppercase }} {{ entry.proclaimerID.firstName }}
                            </td>
                        </tr>
                        <tr class="reportentryDate">
                            <td class="reportentryDateFrom">{{ entry.from | date: 'dd.MM.yyyy'}}</td>
                            <td [hidden]="!entry.submitted" class="reportentryDateTo">{{ entry.to | date: 'dd.MM.yyyy'}}</td>
                        <td [hidden]="entry.submitted" class="reportentryDateTo"></td>
                                        </tr>
                                    </table>
                                </td>
    </tr>
                        </tbody>
                    </table >
                </td >
            </tr >
        </table >*/

function getTerritoryCardHTML(territories) {
    var html = "<html><head><style>" + getTerritoryCardStyle() + "</style></head>" +
        "<body><div align=center>" +
        "<table border=0 cellpadding=0 cellspacing=0 width=1500 class=xl6628767 style='border-collapse:collapse;table-layout:fixed;width:1120pt'>" + getTerritoryCardPages(territories) + "</table>" +
        "</body></div></html>";
    return html;
}

function getTerritoryCardStyle() {
    if (this.styleContent === "" || this.styleContent === undefined)
        this.styleContent = fs.readFileSync("./controller/report/territorycard/territorycard.report.css");
    return this.styleContent;
}


function getTerritoryCardHeader() {
    if (this.headContent === "" || this.headContent === undefined)
        this.headContent = fs.readFileSync("./controller/report/territorycard/territorycard-header.report.html");
    return this.headContent;
}

function getTerritoryCardPages(territories) {
    return territories;
}

function getTerritoryCardPage() {
    return getTerritoryCardHeader();
}

function getTerritoryCardHeader() {
    var html = "" +
        "<tr class=xl7428767 height=33 style='height:24.95pt'>" +
        "<td colspan=2 height=33 class=xl8228767 width=150 style='border-right:1.0pt solid black;height:24.95pt;width:112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none;width:112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "<td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black; border-left:none; width: 112pt'>Ebreichsdorf</td>" +
        "</tr>" +
        "<tr height=33 style='height:24.95pt'>" +
        "<td height=33 class=xl7528767 width=75 style='height:24.95pt;width:56pt'>Nr.</td>" +
        "<td class=xl7628767 width=75 style='width:56pt'>1</td>" +
        "<td class=xl7728767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7828767 width=75 style='width:56pt'>2</td>" +
        "<td class=xl7528767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7628767 width=75 style='width:56pt'>3</td>" +
        "<td class=xl7728767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7828767 width=75 style='width:56pt'>4</td>" +
        "<td class=xl7528767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7628767 width=75 style='width:56pt'>5</td>" +
        "<td class=xl7728767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7828767 width=75 style='width:56pt'>6</td>" +
        "<td class=xl7528767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7628767 width=75 style='width:56pt'>7</td>" +
        "<td class=xl7728767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7828767 width=75 style='width:56pt'>8</td>" +
        "<td class=xl7528767 width=75 style='width:56pt'>Nr.</td>" +
        "<td class=xl7628767 width=75 style='width:56pt'>9</td>" +
        "<td class=xl7528767 width=75 style='border-left:none;width:56pt'>Nr.</td>" +
        "<td class=xl7628767 width=75 style='width:56pt'>10</td>" +
        "</tr>";
}