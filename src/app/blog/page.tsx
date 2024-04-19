import { getDomainURL } from '../lib/getDomainURL';

async function getData() {
  const domain = getDomainURL();
  const endpoint = `${domain}/api/posts/`;
  const res = await fetch(endpoint, { next: { tags: ['posts'] } });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const myData = await res.json();
  return myData;
}

export default async function Blog() {
  const data = await getData();
  const items = data && data.items ? [...data.items] : [];
  return (
    <main>
      <h1>Hello world</h1>
      <p>Posts: </p>

      {items &&
        items.map((item, idx) => {
          return <li key={`post-${idx}`}>{item.title}</li>;
        })}
    </main>
  );
}
