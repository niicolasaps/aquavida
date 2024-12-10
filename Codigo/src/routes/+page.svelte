<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
    import { DropletIcon, LeafIcon, ZapIcon, ShieldIcon } from 'lucide-svelte';
</script>

<div class="flex flex-col min-h-screen">
  
  <main class="flex-1">
    <section class="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-base-100 bg-cover bg-center bg-[url('https://rockwellautomation.scene7.com/is/image/rockwellautomationstage/WaterWastewater_261344590.2400.jpg')]">
        <div class="absolute inset-0 bg-primary bg-opacity-90"></div>
        <div class="relative container px-4 md:px-6">
          <div class="flex flex-col items-center space-y-4 text-center text-primary-content">
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Agende sua visita técnica com um de nossos representantes
              </h1>
              <p class="mx-auto max-w-[700px] md:text-xl">
                Experimente água mais limpa, segura e eficiente com nossa solução avançada de tratamento.
              </p>
            </div>
            <div class="flex gap-4">
              <a href="/login" class="btn btn-secondary w-full">Crie sua conta agora!</a>
            </div>
          </div>
        </div>
      </section>
      
    <!-- <section id="caracteristicas" class="w-full py-12 md:py-24 lg:py-32 bg-base-200">
      <div class="container px-4 md:px-6">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Principais Características</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center space-x-2">
                <DropletIcon class="h-6 w-6 text-info" />
                <span>Filtragem Avançada</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class=" ">Processo de filtragem em várias etapas para qualidade superior</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center space-x-2">
                <LeafIcon class="h-6 w-6 text-success" />
                <span>Ecológico</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class=" ">Design sustentável com impacto ambiental mínimo</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center space-x-2">
                <ZapIcon class="h-6 w-6 text-warning" />
                <span>Eficiente em Energia</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class=" ">Baixo consumo de energia para custos operacionais reduzidos</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center space-x-2">
                <ShieldIcon class="h-6 w-6 text-error" />
                <span>Monitoramento Inteligente</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p class=" ">Monitoramento em tempo real da qualidade da água</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section> -->
    
    <!-- <section id="depoimentos" class="w-full py-12 md:py-24 lg:py-32">
      <div class="container px-4 md:px-6">
        <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">O que nossos clientes dizem</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {#each [1, 2, 3] as i}
            <Card>
              <CardContent class="mt-4">
                <p class=" ">
                  "O sistema de tratamento de água fez uma diferença notável na qualidade da nossa água. É um investimento na nossa saúde e no meio ambiente."
                </p>
                <p class="mt-2 font-semibold">- Cliente Satisfeito {i}</p>
              </CardContent>
            </Card>
          {/each}
        </div>
      </div>
    </section> -->
    <section class="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-content">
      <div class="container px-4 md:px-6">
        <div class="flex flex-col items-center space-y-4 text-center">
          <div class="space-y-2">
            <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Pronto para transformar sua água?
            </h2>
            <p class="mx-auto max-w-[600px] text-primary-content md:text-xl">
              Junte-se a milhares de clientes satisfeitos e experimente a diferença com nosso sistema de tratamento de água.
            </p>
          </div>
          <div class="w-full max-w-sm space-y-2">
            <a class="w-full btn btn-secondary" href="/customer/solicitar">Solicite um serviço</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer class="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
    <p class="text-xs  ">© 2024 AquaVida. Todos os direitos reservados.</p>
    <!-- <nav class="sm:ml-auto flex gap-4 text-xs">
      <a class="hover:underline underline-offset-4" href="#politica">Política de Privacidade</a>
      <a class="hover:underline underline-offset-4" href="#termos">Termos de Uso</a>
    </nav> -->
  </footer>
</div>
