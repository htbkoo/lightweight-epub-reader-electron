import * as React from "react";
import createDOMPurify from "dompurify";

import { BookState } from "../reducers/bookReducer";

interface Props {
  book: BookState;
}

const DOMPurify = createDOMPurify(window);

const ErrorMessage = ({ error }: { error: any }) => {
  if (typeof error?.message !== "string") {
    return <div>Unable to load book</div>;
  } else {
    return <div>Unable to load book: {error?.message}</div>;
  }
};

const BookTextArea = ({ book }: Props) => {
  console.log(`at BookTextArea, book: ${book}`);

  if (book.bookWithMeta) {
    const chapters = book.bookWithMeta.chapters;
    return (
      <div>
        {Object.keys(chapters).map((chapterId) => (
          <div
            key={chapterId}
            id={chapterId}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(chapters[chapterId].text),
            }}
          />
        ))}
      </div>
    );
  } else {
    if (book.isLoadingBook) {
      return <div>Loading...</div>;
    } else if (book.error) {
      return <ErrorMessage error={book.error} />;
    } else {
      return <div>No book chosen yet</div>;
    }
  }
};

export default BookTextArea;
