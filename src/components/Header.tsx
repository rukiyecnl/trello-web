import { FaUser } from "react-icons/fa";

export default function Header() {
    return(
        <div className="flex justify-between py-10 bg-[#ebeaec] rounded-2xl px-8 my-5" >
            <h1 className="font-semibold ">TRELLO DEMO</h1>
            <div className="flex items-center gap-2">
                <FaUser size={16} className="text-2xl text-gray-700" />
                <p>Hoşgeldiniz</p>
            </div>
        </div>
    )
}
