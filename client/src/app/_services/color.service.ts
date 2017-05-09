import { Injectable } from '@angular/core';
/*import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';*/


@Injectable()
export class ColorService {

    private colorObj = {
        'red': { '50': '#FFEBEE', '100': '#FFCDD2', '200': '#EF9A9A', '400': '#EF5350', '500': '#F44336' },
        'pink': { '50': '#FCE4EC', '100': '#F8BBD0', '200': '#F48FB1', '400': '#EC407A', '500': '#E91E63' },
        'purple': { '50': '#F3E5F5', '100': '#E1BEE7', '200': '#CE93D8', '400': '#AB47BC', '500': '#9C27B0' },
        'deep-purple': { '50': '#EDE7F6', '100': '#D1C4E9', '200': '#B39DDB', '400': '#7E57C2', '500': '#673AB7' },
        'indigo': { '50': '#E8EAF6', '100': '#C5CAE9', '200': '#9FA8DA', '400': '#5C6BC0', '500': '#3F51B5' },
        'blue': { '50': '#E3F2FD', '100': '#BBDEFB', '200': '#90CAF9', '400': '#42A5F5', '500': '#2196F3' },
        'light-blue': { '50': '#E1F5FE', '100': '#B3E5FC', '200': '#81D4FA', '400': '#29B6F6', '500': '#03A9F4' },
        'cyan': { '50': '#E0F7FA', '100': '#B2EBF2', '200': '#80DEEA', '400': '#26C6DA', '500': '#00BCD4' },
        'teal': { '50': '#E0F2F1', '100': '#B2DFDB', '200': '#80CBC4', '400': '#26A69A', '500': '#009688' },
        'green': { '50': '#E8F5E9', '100': '#C8E6C9', '200': '#A5D6A7', '400': '#66BB6A', '500': '#4CAF50' },
        'light-green': { '50': '#F1F8E9', '100': '#DCEDC8', '200': '#C5E1A5', '400': '#9CCC65', '500': '#8BC34A' },
        'lime': { '50': '#F9FBE7', '100': '#F0F4C3', '200': '#E6EE9C', '400': '#D4E157', '500': '#CDDC39' },
        'yellow': { '50': '#FFFDE7', '100': '#FFF9C4', '200': '#FFF59D', '400': '#FFEE58', '500': '#FFEB3B' },
        'amber': { '50': '#FFF8E1', '100': '#FFECB3', '200': '#FFE082', '400': '#FFCA28', '500': '#FFC107' },
        'orange': { '50': '#FFF3E0', '100': '#FFE0B2', '200': '#FFCC80', '400': '#FFA726', '500': '#FF9800' },
        'deep-orange': { '50': '#FBE9E7', '100': '#FFCCBC', '200': '#FFAB91', '400': '#FF7043', '500': '#FF5722' },
        'brown': { '50': '#EFEBE9', '100': '#D7CCC8', '200': '#BCAAA4', '400': '#8D6E63', '500': '#795548' },
        'grey': { '50': '#FAFAFA', '100': '#F5F5F5', '200': '#EEEEEE', '400': '#BDBDBD', '500': '#9E9E9E' },
        'blue-grey': { '50': '#ECEFF1', '100': '#CFD8DC', '200': '#B0BEC5', '400': '#78909C', '500': '#607D8B' }
    }

    constructor() { }

    public getColor(name: string, weight?: string) {
        if (weight !== undefined)
            return this.colorObj[name][weight];
        return this.colorObj[name]
    }

}


