import React, {useState} from "react";
import style from "./Paginator.module.scss"

interface IPaginator {
    totalCount: number
    currentPage?: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<IPaginator> = ({totalCount, pageSize, currentPage = 1, portionSize = 20, onPageChanged}) => {
    const [portionNumber, setPortionNumber] = useState(1);

    const pagesCount = Math.ceil(totalCount / pageSize)

    const pagesSize: Array<number> = []

    for (let i = 1; i <= pagesCount; ++i) {
        pagesSize.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize);


    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    const rightPortionPageNumber = portionNumber * portionSize;


    return (
        <div className={style.paginator}>
        {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>}

        {pagesSize.filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber).map((p) => {
                return <span className={`${currentPage === p && style.selectedPage}  ${style.pageNumber}`} key={p} onClick={() => {onPageChanged(p);}}>{p}</span>
            })}
        {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>}


    </div>
    )
}