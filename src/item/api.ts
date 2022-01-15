import {Item} from "./types";

const MOCK: Item[] = [{
    id:1,
    text:'Water'
},
{
    id:2,
    text:'Sugar'
},
{
    id:3,
    text:'Salt'
},
{
    id:4,
    text:'Milk and Eggs'
},
]

export default {
    list:(): Promise<Item[]> => Promise.resolve (MOCK),
    create:(text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
    remove:(id: Item['id']): Promise<Item['id']> => Promise.resolve (id),
}