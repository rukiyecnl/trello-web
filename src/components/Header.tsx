import { FaTrello, FaUser } from "react-icons/fa";

export default function Header() {
    return(
        <div className="flex justify-between py-10 bg-[#ebeaec] rounded-2xl px-8 my-5" >
            <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                <FaTrello size={28} color="#4e222863" />
                <span className="font-bold text-2xl text-[#34020a63]">Trello Demo</span>
            </div>
            <div className="flex items-center gap-2">
                <FaUser size={16} className="text-2xl text-gray-700" />
                <p className="text-[#18010563]">Hoşgeldiniz</p>
            </div>
        </div>
    )
}
