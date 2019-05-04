import React, { useState, useEffect } from 'react';
import Amplify, {API, graphqlOperation } from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { listNotes } from './graphql/queries';
Amplify.configure(aws_exports);

const App = () => {
  const [note, setNotes] = useState([]);

  useEffect(() => {
    handleListNotes();
  }, []);

  const handleListNotes= async () => {
    const { data } = await API.graphql(graphqlOperation(listNotes));
    console.log(data);
    setNotes(data.listNotes.items);
  };

  return (
    <div className="flex flex-column items-center justify-center bg-washed-green pa3">
      <h1 className="code f2">Amplify Notetaker</h1> 
        { /* Note Form */}
        <form action="" className="mb3">
          <input type="text" placeholder="Write Your Note" className="pa2 f4"/>
          <button className="pa2 f4" type="submit">Add</button>
        </form>
        { /* Note List */}
    </div>
  );
};

export default withAuthenticator(App, { includeGreetings: true });
