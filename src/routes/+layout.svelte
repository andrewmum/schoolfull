<script lang="ts">
    import type { LayoutData } from './$types';
    import "../app.css"
    import { user, userData } from '$lib/firebase';
    export let data: LayoutData;

    $user;
    $userData;
</script>

<div class="min-h-screen flex flex-col">
    <slot />
</div>
