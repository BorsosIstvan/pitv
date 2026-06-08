<script>
    // Variabele om het installatiesignaal in te bewaren
    let deferredPrompt;
    const installBtn = document.getElementById('pwa-install-btn');

    // Luister of de browser klaar is om de app te installeren
    window.addEventListener('beforeinstallprompt', (e) => {
        // Voorkom dat de browser zelf direct een pop-up toont
        e.preventDefault();
        // Bewaar het signaal zodat we het later kunnen activeren
        deferredPrompt = e;
        // Maak onze eigen installatieknop zichtbaar
        installBtn.style.display = 'block';
    });

    // Wat er gebeurt als de gebruiker op de knop klikt
    installBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            // Toon de officiële installatie pop-up van de browser
            deferredPrompt.prompt();
            // Wacht op de keuze van de gebruiker (Akkoord of Annuleren)
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`Gebruiker koos voor: ${outcome}`);
            
            // Wis het opgeslagen signaal, het kan maar één keer gebruikt worden
            deferredPrompt = null;
            // Verberg de knop weer, de app wordt nu geïnstalleerd
            installBtn.style.display = 'none';
        }
    });

    // Optioneel: Verberg de knop als de app al succesvol is geïnstalleerd
    window.addEventListener('appinstalled', () => {
        console.log('PWA is succesvol geïnstalleerd!');
        installBtn.style.display = 'none';
    });
</script>
/*
<!-- De installatieknop (standaard verborgen) -->
<button id="pwa-install-btn" style="display: none; padding: 10px 20px; background-color: #160c1b; color: white; border: 1px solid #0b0c10; cursor: pointer; border-radius: 5px;">
    Installeer HitJam2 App
</button>

<!-- Koppel het externe JavaScript-bestand -->
<script src="/HitJam2/js/app.js" defer></script>

*/
