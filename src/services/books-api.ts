import { callApiEndpoint } from "@/lib/api";
import { TBookFormFields, TBookInstance } from "@/types/book";

export const retrieveAllBooksFromCatalog = async () => {
  const data = await callApiEndpoint(`catalog/books`);
  return data;
};

export const getBookDetailsById = async (id: any) => {
  const data = await callApiEndpoint(`catalog/book/${id}`);
  return data;
};

export const registerNewBook = async (book: TBookFormFields) => {
  const data = await callApiEndpoint(
    `${process.env.NEXT_PUBLIC_WEBSITE_URL}api/book`,
    {
      method: "POST",
      body: JSON.stringify(book),
    }
  );
  return data;
};

export const updateBookDetailsById = async (book: TBookFormFields) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_WEBSITE_URL}api/book`, {
    method: "PUT",
    body: JSON.stringify({ ...book }),
  });
  return data;
};

export const retrieveAllBookInstancesFromCatalog = async () => {
  let data = (await callApiEndpoint(
    `catalog/bookinstances`
  )) as TBookInstance[];
  data = data.map((d) => ({
    ...d,
    title: `${d.book.title} : ${d.status}`,
  }));
  return data;
};

export const getBookInstanceDetailsById = async (id: any) => {
  const data = await callApiEndpoint(`catalog/bookinstance/${id}`);
  return data;
};
