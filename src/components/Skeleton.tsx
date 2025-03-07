export const Skeleton = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="mx-auto w-full rounded-md p-4 border">
                    <div className="flex animate-pulse space-x-4 items-center">
                        <div className="size-10 rounded-full bg-gray-200"></div>
                        <div className="flex-1 py-1 flex justify-between">
                            <div className="h-5 w-1/2 rounded bg-gray-200"></div>
                            <div className="size-5 rounded-full bg-gray-200"></div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
