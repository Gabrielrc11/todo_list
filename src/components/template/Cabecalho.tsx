import AvatarUsuario from "./AvatarUsuario"
import Titulo from "./Titulo"

interface CabecalhoProps {
    titulo: string
    subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
    return (
        <div className="flex">
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo} />
            <div className="flex flex-grow justify-end items-center">
                <AvatarUsuario/>
            </div>
        </div>
    )
}