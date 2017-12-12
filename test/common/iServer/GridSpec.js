var Grid = require('../../../src/common/iServer/Grid').Grid;
var ServerColor = require('../../../src/common/iServer/ServerColor').ServerColor;
var ServerStyle = require('../../../src/common/iServer/ServerStyle').ServerStyle;
var ColorDictionary = require('../../../src/common/iServer/ColorDictionary').ColorDictionary;

describe('Grid', function () {
    it('constructor, destroy', function () {
        var options = {
            brightness: 10,
            colorGradientType: false,
            gridType: SuperMap.GridType.CROSS
        };
        var grid = new Grid(options);
        expect(grid.CLASS_NAME).toEqual("SuperMap.Grid");
        expect(grid.colorDictionarys).toBeNull();
        expect(grid.colorGradientType).toBeNull();
        grid.destroy();
    });

    it('fromJson, toServerJSONObject', function () {
        var grid = new Grid();
        var jsonObject = {
            "color": "#a0559c",
            "dashStyle": new ServerStyle(),
            "solidStyle": new ServerStyle()
        };
        grid.specialColor = new ServerColor(160, 87, 97);
        grid.colors = new ServerColor(160, 85, 165);
        grid.dashStyle = new ServerStyle();
        grid.solidStyle = new ServerStyle();
        grid.colorDictionary = [
            new ColorDictionary(10, new ServerColor(160, 40, 156)),
            new ColorDictionary(20, new ServerColor(140, 20, 150))
        ];
        grid.fromJson(jsonObject);
        expect(grid.color).toEqual("#a0559c");
        expect(grid.dashStyle).not.toBeNull();
        expect(grid.solidStyle).not.toBeNull();
        var newJsonObject = grid.toServerJSONObject();
        expect(newJsonObject).not.toBeNull();
        expect(newJsonObject.color).toEqual("#a0559c");
        expect(newJsonObject.colorDictionarys.length).toEqual(2);
        expect(newJsonObject.specialColor.blue).toEqual(97);
        expect(newJsonObject.specialColor.green).toEqual(87);
        expect(newJsonObject.specialColor.red).toEqual(160);
        grid.destroy();
    });
});
