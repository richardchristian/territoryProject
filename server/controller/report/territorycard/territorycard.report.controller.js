const fs = require('fs');
var moment = require('moment');

module.exports = {
    getTerritoryCardHTML
};

var styleContent = "";
var headContent = "";

function getTerritoryCardHTML(territories) {
    var territoryCardPages = getTerritoryCardPages(territories);
    var territoryCardStyle = getTerritoryCardStyles();
    var page = {
        html: `<html>
                    <head><style>${territoryCardStyle}</style></head>
                    <body>
                        <div align=center>
                            <table border=0 cellpadding=0 cellspacing=0 width=1500 class=xl6628767 style='border-collapse:collapse;table-layout:fixed;width:1120pt'>${territoryCardPages}</table>
                        </div>
                    </body>
                </html>`,
        table: `<table border=0 cellpadding=0 cellspacing=0 width=1500 class=xl6628767 style='border-collapse:collapse;table-layout:fixed;width:1120pt'>${territoryCardPages}</table>`,
        style: `<style>${territoryCardStyle}</style>`
    };
    return page;
}

function getTerritoryCardPages(territories) {
    var pages = Math.ceil(territories.length / 10);
    var html = "";
    var start = 0;
    var end = 10;
    for (var p = 0; p < pages; p++) {
        var curTerritories = territories.slice(start, end);
        html += getTerritoryCardPage(curTerritories);
        for (var e = 0; e < 12; e++) {
            html += getTerritoryCardTerritoryEntries(curTerritories, e);
        }
        start += 10;
        end += 10;
    }
    return html;
}

function getTerritoryCardPage(territories) {
    return getTerritoryCardHeader() + getTerritoryCardTerritoriesHeader(territories);
}

function getTerritoryCardHeader() {
    return `<tr height=33>
                <td colspan=5 height=33 class=xl8528767 width=375 style='height:25pt;width:280pt;'><a>GEBIETSKARTEN</a>
                </td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
            </tr>
            <tr height=33 style='height:25pt'>
                <td height=33 class=xl6628767 width=75 style='height:25pt;width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6728767 width=75 style='width:56pt'>Muster:</td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6528767 width=75 style='width:56pt' align=left valign=top>Name des <br>Verk.</td>
                <td colspan=2 class=xl8728767 width=150 style='border-right:1.0pt solid black;width:112pt'>
                    S. Fleißig
                </td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6828767 width=75 style='width:56pt'></td>
                <td class=xl6828767 width=75 style='width:56pt'></td>
                <td class=xl6828767 width=75 style='width:56pt'></td>
                <td class=xl6828767 width=75 style='width:56pt'></td>
                <td class=xl6828767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
            </tr>
            <tr height=33 style='height:25pt'>
                <td height=33 class=xl6628767 width=75 style='height:25pt;width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6528767 width=75 style='width:56pt; vertical-align:"middle"; text-align:"left";'>ausgegeben am</td>
                <td class=xl7028767 width=75 style='border-top:none;width:56pt'>07.11.2012</td>
                <td class=xl7028767 width=75 style='border-top:none;width:56pt'>08.03.2013</td>
                <td class=xl6528767 width=75 style='width:56pt; vertical-align:"middle"; text-align:"center";'>&nbsp; zurück am</td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl7228767 width=75 style='width:56pt'></td>
                <td class=xl7228767 width=75 style='width:56pt'></td>
                <td class=xl7228767 width=75 style='width:56pt'></td>
                <td class=xl7228767 width=75 style='width:56pt'></td>
                <td class=xl7328767 width=75 style='width:56pt'></td>
            </tr>
            <tr height=33 style='height:25pt'>
                <td height=33 class=xl6628767 width=75 style='height:25pt;width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
                <td class=xl6628767 width=75 style='width:56pt'></td>
            </tr>`;
}

function getTerritoryCardTerritoriesHeader(territories) {
    return `<tr class=xl7428767 height=33 style='height:25pt'>
                <td colspan=2 height=33 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    height:25pt;width:112pt'>${territories[0].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none;width:112pt'>${territories[1].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[2].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[3].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[4].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[5].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[6].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[7].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[8].name}</td>
                <td colspan=2 class=xl8228767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>${territories[9].name}</td>
            </tr>
            <tr height=33 style='height:25pt'>
                <td height=33 class=xl7528767 width=75 style='height:25pt;width:56pt'>Nr.</td>
                <td class=xl7628767 width=75 style='width:56pt'>${territories[0].territoryNumber}</td>
                <td class=xl7728767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7828767 width=75 style='width:56pt'>${territories[1].territoryNumber}</td>
                <td class=xl7528767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7628767 width=75 style='width:56pt'>${territories[2].territoryNumber}</td>
                <td class=xl7728767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7828767 width=75 style='width:56pt'>${territories[3].territoryNumber}</td>
                <td class=xl7528767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7628767 width=75 style='width:56pt'>${territories[4].territoryNumber}</td>
                <td class=xl7728767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7828767 width=75 style='width:56pt'>${territories[5].territoryNumber}</td>
                <td class=xl7528767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7628767 width=75 style='width:56pt'>${territories[6].territoryNumber}</td>
                <td class=xl7728767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7828767 width=75 style='width:56pt'>${territories[7].territoryNumber}</td>
                <td class=xl7528767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7628767 width=75 style='width:56pt'>${territories[8].territoryNumber}</td>
                <td class=xl7528767 width=75 style='width:56pt'>Nr.</td>
                <td class=xl7628767 width=75 style='width:56pt'>${territories[9].territoryNumber}</td>
            </tr>`;
}

function getTerritoryCardTerritoryEntries(territories, index) {
    return `<tr height=33 style='height:25pt'>
                <td colspan=2 height=33 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    height:25pt;width:112pt'>
                    ${territories[0].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[0].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none;width:112pt'>
                    ${territories[1].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[1].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[2].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[2].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[3].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[3].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[4].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[4].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[5].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[5].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[6].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[6].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[7].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[7].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[8].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[8].entries[index].proclaimerID.firstName} 
                </td>
                <td colspan=2 class=xl8028767 width=150 style='border-right:1.0pt solid black;
                    border-left:none; width:112pt'>
                    ${territories[9].entries[index].proclaimerID.lastName.toUpperCase()} ${territories[9].entries[index].proclaimerID.firstName} 
                </td>
            </tr>
            <tr height=33 style='height:25pt'>
                <td height=33 class=xl7028767 width=75 style='height:25pt;border-top:none;
                    width:56pt'>${territories[0].entries[index].from !== undefined &&
            moment(territories[0].entries[index].from).isValid() ?
            moment(territories[0].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[0].entries[index].submitDate !== undefined &&
            moment(territories[0].entries[index].submitDate).isValid() ?
            moment(territories[0].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[1].entries[index].from !== undefined &&
            moment(territories[1].entries[index].from).isValid() ?
            moment(territories[1].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[1].entries[index].submitDate !== undefined &&
            moment(territories[1].entries[index].submitDate).isValid() ?
            moment(territories[1].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[2].entries[index].from !== undefined &&
            moment(territories[2].entries[index].from).isValid() ?
            moment(territories[2].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[2].entries[index].submitDate !== undefined &&
            moment(territories[2].entries[index].submitDate).isValid() ?
            moment(territories[2].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[3].entries[index].from !== undefined &&
            moment(territories[3].entries[index].from).isValid() ?
            moment(territories[3].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[3].entries[index].submitDate !== undefined &&
            moment(territories[3].entries[index].submitDate).isValid() ?
            moment(territories[3].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[4].entries[index].from !== undefined &&
            moment(territories[4].entries[index].from).isValid() ?
            moment(territories[4].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[4].entries[index].submitDate !== undefined &&
            moment(territories[4].entries[index].submitDate).isValid() ?
            moment(territories[4].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[5].entries[index].from !== undefined &&
            moment(territories[5].entries[index].from).isValid() ?
            moment(territories[5].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[5].entries[index].submitDate !== undefined &&
            moment(territories[5].entries[index].submitDate).isValid() ?
            moment(territories[5].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[6].entries[index].from !== undefined &&
            moment(territories[6].entries[index].from).isValid() ?
            moment(territories[6].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[6].entries[index].submitDate !== undefined &&
            moment(territories[6].entries[index].submitDate).isValid() ?
            moment(territories[6].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[7].entries[index].from !== undefined &&
            moment(territories[7].entries[index].from).isValid() ?
            moment(territories[7].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[7].entries[index].submitDate !== undefined &&
            moment(territories[7].entries[index].submitDate).isValid() ?
            moment(territories[7].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[8].entries[index].from !== undefined &&
            moment(territories[8].entries[index].from).isValid() ?
            moment(territories[8].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[8].entries[index].submitDate !== undefined &&
            moment(territories[8].entries[index].submitDate).isValid() ?
            moment(territories[8].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7028767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[9].entries[index].from !== undefined &&
            moment(territories[9].entries[index].from).isValid() ?
            moment(territories[9].entries[index].from).format('DD.MM.YYYY') : ""}</td>
                <td class=xl7128767 width=75 style='border-top:none;border-left:none;
                    width:56pt'>${territories[9].entries[index].submitDate !== undefined &&
            moment(territories[9].entries[index].submitDate).isValid() ?
            moment(territories[9].entries[index].submitDate).format('DD.MM.YYYY') : ""}</td>
            </tr>`;
}

function getTerritoryCardStyles() {
    return `           
            .font528767 {
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
            }
            
            .font628767 {
                color: black;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
            }
            
            .xl6528767 {
                padding: 0px;
                color: windowtext;
                font-size: 7.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: left;
                vertical-align: middle;
                white-space: normal;
            }
            
            .xl6628767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: general;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl6728767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 700;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: right;
                vertical-align: middle;
                white-space: normal;
            }
            
            .xl6828767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 700;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: general;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl6928767 {
                padding: 0px;
                color: windowtext;
                font-size: 7.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: right;
                vertical-align: middle;
                white-space: normal;
            }
            
            .xl7028767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: .5pt solid windowtext;
                border-right: .5pt solid windowtext;
                border-bottom: 1.0pt solid windowtext;
                border-left: 1.0pt solid windowtext;
                white-space: normal;
            }
            
            .xl7128767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: .5pt solid windowtext;
                border-right: 1.0pt solid windowtext;
                border-bottom: 1.0pt solid windowtext;
                border-left: .5pt solid windowtext;
                white-space: normal;
            }
            
            .xl7228767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl7328767 {
                padding: 0px;
                color: windowtext;
                font-size: 7.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: general;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl7428767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl7528767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 700;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: none;
                border-right: none;
                border-bottom: none;
                border-left: 1.0pt solid windowtext;
                white-space: normal;
            }
            
            .xl7628767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: none;
                border-right: 1.0pt solid windowtext;
                border-bottom: none;
                border-left: none;
                white-space: normal;
            }
            
            .xl7728767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 700;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                white-space: normal;
            }
            
            .xl7828767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                white-space: normal;
            }
            
            .xl7928767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: .5pt solid windowtext;
                border-right: 1.0pt solid windowtext;
                border-bottom: 1.0pt solid windowtext;
                border-left: 1.0pt solid windowtext;
                white-space: normal;
            }
            
            .xl8028767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: 1.0pt solid windowtext;
                border-right: none;
                border-bottom: .5pt solid windowtext;
                border-left: 1.0pt solid windowtext;
                white-space: normal;
            }
            
            .xl8128767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: 1.0pt solid windowtext;
                border-right: 1.0pt solid windowtext;
                border-bottom: .5pt solid windowtext;
                border-left: none;
                white-space: normal;
            }
            
            .xl8228767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 700;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: 1.0pt solid windowtext;
                border-right: none;
                border-bottom: none;
                border-left: 1.0pt solid windowtext;
                white-space: normal;
            }
            
            .xl8328767 {
                padding: 0px;
                color: windowtext;
                font-size: 8.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: 1.0pt solid windowtext;
                border-right: 1.0pt solid windowtext;
                border-bottom: none;
                border-left: none;
                white-space: normal;
            }
            
            .xl8428767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: left;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl8528767 {
                padding: 30px 0px 0px 0px !important;
                color: windowtext;
                font-size: 16.0pt;
                font-weight: bold;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: left;
                vertical-align: middle;
                white-space: normal;
            }
            
            .xl8628767 {
                padding: 0px;
                color: windowtext;
                font-size: 13.0pt;
                font-weight: 700;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: left;
                vertical-align: bottom;
                white-space: normal;
            }
            
            .xl8728767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: 1.0pt solid windowtext;
                border-right: none;
                border-bottom: .5pt solid windowtext;
                border-left: 1.0pt solid windowtext;
                white-space: normal;
            }
            
            .xl8828767 {
                padding: 0px;
                color: windowtext;
                font-size: 10.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: center;
                vertical-align: middle;
                border-top: 1.0pt solid windowtext;
                border-right: 1.0pt solid windowtext;
                border-bottom: .5pt solid windowtext;
                border-left: none;
                white-space: normal;
            }
            
            .xl8928767 {
                padding: 0px;
                color: windowtext;
                font-size: 7.0pt;
                font-weight: 400;
                font-style: normal;
                text-decoration: none;
                font-family: Arial, sans-serif;
                text-align: left;
                vertical-align: bottom;
                white-space: normal;
            }`;
}