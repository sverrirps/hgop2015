##Vagrant

Vagrant er hugbúnaður sem býr til og aðlagar sýndar-þróunarumhverfi. Hægt er að horfa á það sem umbúðir um sýndargervi hugbúnað til að mynda VirtualBox, VMware, KVM eða Linux Containers sem og utan um rekstrar hubúnað til dæmis Ansible, Chef, Salt eða Puppet. Vagrant var upprunalega bundið við Virtualbox, en seinni útgáfur virka líka með öðrum sýndarvélum. Vagrant er skrifað í Ruby, en getur verið notað í verkefnum skrifuðum í öðrum tungumálum til dæmis PHP, Python, Java, C# and JavaScript. Nýjar útgáfur styðja líka Docker gáma, sem í sumum tilfellum getur virkað sem heilt sýndar stýrikerfi.

##VirtualBox

VirtualBox er hugbúnaður sem býr til og keyrir sýndarvélar, fyrir x86 tölvur frá Oracle Corporation. Upprunalega þróað af Innotek GmbH, keypt af Sun Microsystems árið 2008 og svo af Oracle 2010. Hægt er að setja VirtualBox upp á þó nokkur stýrikerfi til dæmis, Linux, OS X og Windows Vista. VirtualBox styður sköpun og rekstur gesta sýndarvéla keyrandi útgáfur af Windows, Linux, BSD og fleirum en takmarkaða sýndargervingu OS X gesta á Apple vélbúnaði.

##Grunt

Grunt er JavaScript verkefna keyrandi sem hjálpar til við að framkvæma verkefni sem eru mikið endurtekin eins og "minification" (sem er ferlið að eyða öllum óþörfum stöfum úr source kóða án þess að breyta hegðun þess), þýðingu eða einingaprófanir.

##npm

npm er sjálfgildur pakka stjóri (e. packet manager) fyrir JavaScript runtime umhverfið Node.js. npm auðveldar JavaScript forriturum og hugbúnaðar hönnuðum að deila og endurnota kóða. Einnig auðveldar það að uppfæra þann kóða sem þú ert að deila.

##Node.js

Node.js er open-source, cross-platform runtime umhverfi fyrir þróun server-side vef hugbúnaðar. Node.js hugbúnaður er skrifaður í JavaScript og er keyranlegur með Node.js runtime á OS X, Microsoft Windows, Linux, FreeBSD og fleirum.

##Bower

Bower er pakka stjóri (e. packet manager) fyrir JavaScript söfn sem gera þér kleift að skilgreina, endurútgefa og lagfæra dependencies.


##Topology of the deployment so far

Við þurfum að vera með bæði development virtual vélina og test virtual vélina keyrandi svo að build ferlið virki. Undir venjulegum kringumstæðum væri test vélin á annari vél sem hægt væri að gera ráð fyrir að væri alltaf keyrandi. Hægt er að tengjast test vélinni frá dev vélinni með ssh og ip addressunni á test vélinni, þar sem dev vélin hefur lykil að test vélinni og þarf ekki að gefa upp lykilorð til að tengjast henni. Dev vélin getur þá uppfært og keyrt aftur á test vélinni.

##Load tests/Capacity tests

Ég gef virtual vélinni 3GB af minni til að vinna með. Ég fæ fínar niðurstöður og get leikið 100 leiki á innan við 3 sekúndum. Niðurstaðan er yfirleitt í kringum 2.2 til 2.3 sekúndur svo þó ég bæti við 20-30% þá helst það samt undir 3 sekúndum.

##Does the load test run in serial or in parallel?

Load testin keyrast samhliða. Í Node er notað það sem heitir asynchronous I/O sem geyrir því kleipt að spila leikina á sama tíma og tékkar hvort allir leikirnir klárast innan gefins tíma, annars pass-a prófin ekki.