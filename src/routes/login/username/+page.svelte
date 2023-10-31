<script lang="ts">
    import AuthCheck from "$lib/components/AuthCheck.svelte";
    import { db, user, userData } from "$lib/firebase";
    import { getDatabase, set } from "firebase/database";
    import { doc, getDoc, writeBatch} from "firebase/firestore";
    import { ref } from "firebase/storage";

    let username = "";
    let loading = false;
    let isAvailable = false;
  
    
    let debounceTimer: NodeJS.Timeout;
  
    async function checkAvailability() {
      isAvailable = false;
      clearTimeout(debounceTimer);
  
      loading = true;
  
      debounceTimer = setTimeout(async () => {
          console.log("checking availability of", username);
          
          const ref = doc(db, "usernames", username);
          const exists = await getDoc(ref).then((doc) => doc.exists());
  
          isAvailable = !exists;
          loading = false;
  
      }, 500);
  
    }
  
    async function confirmUsername() {
        console.log("confirming username", username);
        const batch = writeBatch(db);
        batch.set(doc(db, "usernames", username), { uid: $user?.uid });
        batch.set(doc(db, "users", $user!.uid), { 
        username, 
        photoURL: $user?.photoURL ?? null,
        published: true,
        bio: 'I am the Walrus',
        links: [
            {
            title: 'Test Link',
            url: 'https://kung.foo',
            icon: 'custom'
            }
        ]
        });

        await batch.commit();

        username = '';
        isAvailable = false;

    }
  
  </script>
  
  
  
  <AuthCheck>
    {#if $userData?.username }
      <h2>Username {$userData?.username}</h2>
    {/if  }
      <form class="w-2/5" on:submit|preventDefault={confirmUsername}>
          <input
            type="text"
            placeholder="Username"
            class="input w-full"
            bind:value={username}
            on:input={checkAvailability}
          />
  
          <p>Is available? {isAvailable}</p>
  
          <button class="btn btn-success">Confirm username @{username} </button>
  
        </form>
  
  </AuthCheck>