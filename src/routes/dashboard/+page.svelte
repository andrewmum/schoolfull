<script lang="ts">
    import { auth } from "$lib/firebase";

    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
    import { user } from "$lib/firebase";
  import { goto } from "$app/navigation";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        const user = await signInWithPopup(auth, provider);
        console.log(user)
    }
    async function signOutAndRedirect(){
      signOut(auth)
      goto('/');
    }
</script>


{#if $user}
  <h2 class="card-title">Welcome, {$user.displayName}</h2>
  <p class="text-center text-success">You are logged in</p>
  <button class="btn btn-warning" on:click={signOutAndRedirect}>Sign out</button>
{/if}

