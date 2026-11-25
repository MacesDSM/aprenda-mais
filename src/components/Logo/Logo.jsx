import { GraduationCap } from "lucide-react";
import { Link } from "react-router";

export function Logo() {
    return (
        <Link className="brand" to="/home" aria-label="Aprenda Mais - início">
            <figure className="brand-mark" aria-hidden="true"><GraduationCap size={21} strokeWidth={2.4} /></figure>
            <p>aprenda<strong className="brand-highlight">+</strong></p>
        </Link>
    )
}