import helmet from "helmet"

export default function (app, e) {
    app.use(helmet())
    app.use(e.urlencoded({extended:true}))
    app.use(e.json())
    app.use(e.static("public"))
}
