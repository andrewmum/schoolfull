<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { getDatabase, set } from "firebase/database";
    import { doc, getDoc, writeBatch, collection, query, where, getDocs} from "firebase/firestore";
    import { ref } from "firebase/storage";
    import { writable } from "svelte/store";

    let firstName = "";
    let bank = 0;
    let lastName = "";
    let key = firstName + '_' + lastName
    let loading = false;
    let isAvailable = false;
    let uuid  = crypto.randomUUID();
    let students = writable();
    function getStudents(){
      window.location.href = window.location.href + '/' + $userData?.username
    }



  
</script>



<AuthCheck>
  <form class="w-2/5" on:submit|preventDefault={getStudents}>
      <div class="my-4 min-h-16 px-8 w-full">

          <button class="btn btn-outline btn-info">get Students @{firstName} </button>
      </div>
      <div id="students">
        <ul>

        </ul>

      </div>
  </form>



</AuthCheck>
