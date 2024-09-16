import Link from "next/link"
import useAuth from "@/data/hook/useAuth"

export default function AvatarUsuario() {
    const { usuario } = useAuth()
    return (
        <Link href="/perfil">
            <img 
                src={usuario?.imagemUrl ?? "/images/Avatar.svg"} 
                alt="Avatar do usuario"
                className="h-10 w-10 rounded-full cursor-pointer text-gray-700"
            />
        </Link>
    )
}