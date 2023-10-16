export interface GMLPoint {
  'gml:id': string;
  srsDimension: string;
  srsName: string;
}

export interface GMLPointElement {
  $: GMLPoint;
  'gml:pos': string[];
}

export interface BsWfsLocation {
  'gml:Point': GMLPointElement[];
}

export interface BsWfsBsWfsElementClass {
  'gml:id': string;
}

export interface BsWfsBsWfsElement {
  $: BsWfsBsWfsElementClass;
  'BsWfs:Location': BsWfsLocation[];
  'BsWfs:Time': Date[];
  'BsWfs:ParameterName': string[];
  'BsWfs:ParameterValue': string[];
}

export interface MemberElement {
  'BsWfs:BsWfsElement': BsWfsBsWfsElement[];
}

export interface weather {
  smartsymbol: number
  smartsymboltext: string
  temperature: number
  time: string
  windspeedms: number,
  Humidity: number,
  WindDirection: number
}