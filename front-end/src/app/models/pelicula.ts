export class Pelicula
{
    public _id: string;
    public title: string;
    public content: string;
    public image: string;
    public director: {nombre: string, apellidos: string};
    public category: Array<string>;
    public date: string;


    constructor(_id: string,title: string, content: string, date:string, image: string, director:{nombre: string, apellidos: string}, category:Array<string>)
    {
        this._id = _id
        this.title = title;
        this.content = content;
        this.image = image;
        this.director = director;
        this.category = category;
        this.date = date;
    }
}