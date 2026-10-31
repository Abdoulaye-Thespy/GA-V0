import Link from "next/link"

export default function AccountOptions() {
  return (
    <section className="bg-sand px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="container mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-gold-dark">Choisissez votre accès</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-forest sm:text-4xl">Apprenez au rythme qui vous convient.</h2>
          <p className="mt-4 leading-7 text-muted-foreground">Commencez par découvrir le blog, créez un compte gratuit ou choisissez l’accès Pro à vie.</p>
        </div>

        <div className="mt-9 overflow-x-auto rounded-2xl border border-border bg-white shadow-sm">
          <table className="w-full min-w-[760px] border-collapse text-left text-sm">
            <caption className="sr-only">Comparaison des accès Visiteur, Free et Pro à Global Academy</caption>
            <thead>
              <tr className="bg-forest text-white">
                <th scope="col" className="w-[28%] p-5 font-semibold">Accès</th>
                <th scope="col" className="p-5"><span className="block font-serif text-xl">Visiteur</span><span className="mt-1 block text-xs font-normal text-white/75">Gratuit</span></th>
                <th scope="col" className="p-5"><span className="block font-serif text-xl">Compte Free</span><span className="mt-1 block text-xs font-normal text-white/75">0 FCFA</span></th>
                <th scope="col" className="bg-forest-light p-5"><span className="block font-serif text-xl">Compte Pro</span><span className="mt-1 block text-xs font-normal text-white/75">15 000 FCFA · à vie</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-muted-foreground">
              <tr><th scope="row" className="p-5 font-semibold text-forest">Liste du blog et aperçus</th><td className="p-5">Accessible</td><td className="p-5">Accessible</td><td className="p-5">Accessible</td></tr>
              <tr><th scope="row" className="p-5 font-semibold text-forest">Articles complets, vidéos et labs du blog</th><td className="p-5">Compte requis</td><td className="p-5">Inclus</td><td className="p-5">Inclus</td></tr>
              <tr><th scope="row" className="p-5 font-semibold text-forest">Cours explicitement gratuits</th><td className="p-5">Compte requis</td><td className="p-5">Inclus</td><td className="p-5">Inclus</td></tr>
              <tr><th scope="row" className="p-5 font-semibold text-forest">Short courses et labs, actuels et futurs</th><td className="p-5">Compte requis</td><td className="p-5">Accès Pro requis</td><td className="p-5">Tous inclus</td></tr>
              <tr><th scope="row" className="p-5 font-semibold text-forest">Certificats éligibles</th><td className="p-5">Compte requis</td><td className="p-5">5 000 FCFA par certificat</td><td className="p-5">Génération et téléchargement inclus</td></tr>
              <tr><th scope="row" className="p-5 font-semibold text-forest">Renouvellement</th><td className="p-5">—</td><td className="p-5">—</td><td className="p-5">Aucun, paiement unique</td></tr>
              <tr className="bg-sand/70"><th scope="row" className="p-5 font-semibold text-forest">Créer un compte</th><td className="p-5"><Link href="/blog" className="font-bold text-forest underline">Découvrir le blog</Link></td><td className="p-5"><Link href="/signup" className="font-bold text-forest underline">Créer un compte Free</Link></td><td className="p-5"><Link href="/signup" className="font-bold text-forest underline">Choisir Pro</Link></td></tr>
            </tbody>
          </table>
        </div>

        <p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-5 text-muted-foreground">Les formations diplômantes avec examen (DQP/CQP) ne sont pas comprises dans l’accès Pro ni dans l’achat de certificat à l’unité. Elles suivent leur parcours d’admission et de certification dédié.</p>
      </div>
    </section>
  )
}
