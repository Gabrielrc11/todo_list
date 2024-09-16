import Head from 'next/head'
import Image from "next/image"
import router from "next/router"
import Loading from "../../../public/images/Loading.gif"
import useAuth from "@/data/hook/useAuth"

export default function ForcarAutenticacao(props) {

    const { usuario, carregando  } = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script 
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes("todo-list")) {
                                    window.location.href = "/autenticacao"
                                }
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={Loading} alt={"Loading"} />
            </div>
        )
    }

    if(!carregando && usuario?.email){
        return renderizarConteudo()
    } else if(carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}