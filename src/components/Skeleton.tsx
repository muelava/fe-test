import { FC } from "react"

interface SkeletonProps {
    count?: number
}
export const Skeleton: FC<SkeletonProps> = ({ count = 1 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="mx-auto w-full rounded-md py-2">
                    <div className="flex animate-pulse space-x-4 items-center pl-3">
                        <div className="flex-1 py-1">
                            <div className="w-1/2 rounded bg-gray-200 mb-2 h-4"></div>
                            <div className="w-full rounded bg-gray-200 mb-2 h-4"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
