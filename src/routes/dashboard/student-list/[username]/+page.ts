import { collection, getDocs, limit, query, where } from "firebase/firestore";
import type { PageLoad } from "./$types";
import { db } from "$lib/firebase";
import { error } from "@sveltejs/kit";

export const load = (async ({ params }) => {
    
  const collectionRef = collection(db, "students");
    
  const q = query(
    collectionRef,
    where("teacher", "==", params.username)
  );
  const snapshot = await getDocs(q);
  
  const d = snapshot.docs;
  const res: any[] = [];
  d.forEach(element => {
    let studentObj = {id: element.id, data : element.data()}
    res.push(studentObj)
  });



  return {
    students : res,
    teacher: params.username
  };
}) satisfies PageLoad;