function CommentList({ comments = [], maxHeightClass = "max-h-40" }) {
  const hasComments = comments.length > 0;

  return (
    <div className="flex flex-col gap-1 rounded-lg bg-blue-50 dark:bg-gray-700/30 p-2 overflow-y-auto scroll-auto">
      {hasComments && <p className="text-xs">comments</p>}
      <div className={`${maxHeightClass} overflow-y-auto`}>
        {hasComments ? (
          comments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div
                key={`${comment.createdAt || "comment"}-${index}`}
                className="bg-white leading-2.75 border border-dashed border-gray-200 dark:border-gray-600 dark:bg-gray-700/50 rounded-md py-1 px-1.5 w-full min-h-5.5 flex flex-col gap-1 overflow-auto"
              >
                <p className="font-black text-[10px] text-blue-700">
                  @{comment.author}
                </p>
                <div className="border-l border-gray-300 dark:border-gray-500 px-1 w-full h-full flex flex-col gap-0.5 text-[12px]">
                  <p className="text-[11px] font-medium">{comment.message}</p>
                  <p className="text-[9px] text-black/40 dark:text-gray-100">
                    {comment.createdAt
                      ? new Date(comment.createdAt).toUTCString().slice(0, -7)
                      : ""}
                  </p>
                </div>
              </div>
            ))
        ) : (
          <p className="text-xs text-gray-400 text-center">No comments yet</p>
        )}
      </div>
    </div>
  );
}

export default CommentList;
