import Image from "./Image.astro";
import ProductNumber from "./ProductNumber.astro";

<Fragment>
{productObject &&
(

<Fragment><div class="flex flex-wrap sm:flex-nowrap content-between w-64 min-w-64 md:(w-96 min-w-96) ml-1 lg:ml-1.5 relative bg-white mb-4 underline-on-hover">
{/** product image */}
<div class="img--4/3 img--small">
{productObject.photo !== null ?
<Fragment><Image imageObject={{
src: 'https://img.freepik.com/darmowe-wektory/tlo-retro-modeli-geometrycznych_52683-17902.jpg?w=1380&t=st=1706311337',
alt: 'Image Alt',
height: '180',
width: '240',
class: 'img--overlay object-cover'
}} /></Fragment>
:
<Fragment><img src="/1x1.png" class="bg-gray-100/70" alt={productObject.name} /></Fragment>}
</div>

{/** product deails */}
<div class="sm:pl-4 flex flex-col">
<a class="font-light leading-none mb-2 pr-4 line-clamp-2 h-[2em] before:(content-empty absolute left-0 right-4 h-full top-0)" href={productObject.url} itemprop="url" title={productObject.number}>
{productObject.name}
</a>

<ProductNumber productNumber={productObject.number} copyDisabled={true} />

{index !== null &&
(<Fragment><meta itemprop="position" content={String(index)} /></Fragment>
,
<Fragment><meta itemprop="name" content={productObject.name} /></Fragment>)}
</div>

</div></Fragment>

)}


</Fragment>;