// Script para a página de história de Alexandre e Milena

document.addEventListener('DOMContentLoaded', function() {
    // Configurações da galeria
    const fotosPerPage = 20;
    let paginaAtual = 1;
    let filtroAtual = 'todos';
    let todasFotos = [];
    
    // Função para carregar todas as imagens da pasta
    const carregarTodasFotos = () => {
        // Lista de fotos principais para categorias específicas
        const fotosInicioRelacionamento = [
            'DSC00531.JPG', 'DSC00549.JPG', 'DSC00509.JPG', 'DSC00266.JPG', 
            'DSC00258.JPG', 'DSC00272.JPG'
        ];
        
        const fotosCasamento = [
            'DSC03658.JPG', 'DSC03657.JPG', 'casamento9.jpg', 'casamento5.jpg', 
            'casamento2.jpg'
        ];
        
        const fotosRomanticas = [
            'DSC01424.JPG', 'DSC01426.JPG', 'DSC01430.JPG', 'DSC01412.JPG', 
            'DSC00500.JPG'
        ];
        
        const fotosViagens = [
            'DSC02154.JPG', 'DSC02149.JPG', 'DSC02156.JPG', 'DSC02157.JPG', 
            'DSC02420.JPG', 'DSC02422.JPG', 'DSC02426.JPG'
        ];
        
        const fotosFamilia = [
            'DSC01012.JPG', 'DSC00919.JPG', 'DSC00857.JPG', 'DSC00860.JPG'
        ];
        
        const fotosRecentes = [
            'IMG_20250317_103105594_HDR.jpg', 'IMG_20250315_172126655.jpg',
            'IMG_20250316_100019766.jpg', 'IMG_20250315_195116499.jpg',
            'IMG_20250315_135405950_HDR.jpg', 'IMG_20250317_130055218_HDR.jpg',
            'IMG_20250315_193825669_HDR.jpg', 'IMG_20250317_104625252_HDR.jpg',
            'IMG_20250316_120423622_HDR.jpg', 'IMG_20250318_102717206.jpg',
            'IMG_20250318_103401579.jpg', 'IMG_20250318_102941724.jpg'
        ];
        
        // Função para categorizar uma foto
        const categorizarFoto = (filename) => {
            if (fotosInicioRelacionamento.includes(filename)) return 'inicio';
            if (fotosCasamento.includes(filename)) return 'casamento';
            if (fotosRomanticas.includes(filename)) return 'romantico';
            if (fotosViagens.includes(filename)) return 'viagens';
            if (fotosFamilia.includes(filename)) return 'familia';
            if (fotosRecentes.includes(filename) || filename.includes('IMG_2025')) return 'recentes';
            
            // Categorização baseada em padrões de nome
            if (filename.includes('casamento')) return 'casamento';
            if (filename.startsWith('IMG_2014') || filename.startsWith('IMG_2015')) return 'inicio';
            if (filename.startsWith('IMG_2024') || filename.startsWith('IMG_2025')) return 'recentes';
            if (filename.startsWith('DSC02')) return 'viagens';
            
            return 'todos';
        };
        
        // Lista de todas as fotos extraídas
        const todasFotosExtraidas = [
            // Fotos do início do relacionamento
            ...fotosInicioRelacionamento,
            
            // Fotos do casamento
            ...fotosCasamento,
            
            // Fotos do jantar romântico
            ...fotosRomanticas,
            
            // Fotos de viagens
            ...fotosViagens,
            
            // Fotos de família
            ...fotosFamilia,
            
            // Fotos recentes
            ...fotosRecentes,
            
            // Adicionar todas as fotos extraídas dos arquivos ZIP
            'IMG_12117793443761.jpeg', 'DSC04989.JPG', 
            'IMG_20141225_240246459.jpg', 'IMG_20141224_212132966.jpg',
            'IMG_20150829_194714121.jpg', 'IMG_20141224_200053712_HDR.jpg',
            'IMG_20141224_212457271.jpg', 'IMG_20150809_153839187_HDR.jpg',
            'IMG_20150809_130544845.jpg', 'IMG_20141213_201301353.jpg',
            'IMG_20141224_212200704.jpg', 'IMG_20151206_144708260.jpg',
            'IMG_20151127_155419442.jpg', 'IMG_20151203_181357260.jpg',
            'IMG_20160824_212641.jpg', 'IMG_20151127_155131013.jpg',
            'IMG_20151211_210247287.jpg', 'IMG_20151217_195401987_HDR.jpg',
            'IMG_20151213_132249823.jpg', 'IMG_20151219_200001740.jpg',
            'IMG_20151218_135051.jpg', 'IMG_20151219_103701.jpg',
            'IMG_20151217_194406938.jpg', 'IMG_20151217_224840598.jpg',
            'IMG_20151217_194321181.jpg', 'IMG_20151216_210517750.jpg',
            'IMG_20151217_225650844.jpg', 'IMG_20151211_212605407.jpg',
            'IMG_20151217_204816587.jpg', 'IMG_20151219_203200048.jpg',
            'IMG_20151211_210737406.jpg', 'IMG_20151224_203042264.jpg',
            'IMG-20151213-WA0017.jpg', 'IMG_20151219_215212402.jpg',
            'IMG_20151219_203212489.jpg', 'IMG_20151216_210441560.jpg',
            'IMG_20151219_080825.jpg', 'IMG_20151217_203712531.jpg',
            'IMG_20151219_204923243.jpg', 'IMG_20151220_013355616.jpg',
            'IMG_20151224_200855662.jpg', 'IMG_20151219_225813257.jpg',
            'IMG_20151219_204941118.jpg', 'IMG_20151219_204907987.jpg',
            'IMG_20151219_210759927.jpg', 'IMG_20151219_215041690.jpg',
            'IMG_20151219_220701120.jpg', 'IMG_20151219_220837703.jpg',
            'IMG_20151219_215110843.jpg', 'IMG_20151220_013454511.jpg',
            'IMG_20151220_034059012.jpg', 'IMG_20151226_174847764.jpg',
            'IMG_20151225_155856887.jpg', 'IMG_20160101_244219789.jpg',
            'IMG_20160101_240848823.jpg', 'IMG_20151226_174903601_HDR.jpg',
            'IMG_20151227_101105209_HDR.jpg', 'IMG_20160101_240911790.jpg',
            'IMG_20151227_151558171_HDR.jpg', 'IMG_20160111_171738954.jpg',
            'IMG_20160207_110723491.jpg', 'IMG_20160101_244221768.jpg',
            'IMG_20160207_110800221_HDR.jpg', 'IMG_20151231_214713581.jpg',
            'IMG_20160101_244233285.jpg', 'IMG_20151231_214719911.jpg',
            'IMG_20160127_193340060.jpg', 'IMG_20151227_151542390_HDR.jpg',
            'IMG_20151231_151938745_HDR.jpg', 'IMG_20151231_214651599.jpg',
            'IMG_20151226_224334834.jpg', 'IMG_20190301_202054176.jpg',
            'IMG_20191025_134538628.jpg', '20190302_224240.jpg',
            'FB_IMG_1552899705970.jpg', '20190307_095815.jpg',
            '20190303_001712.jpg', '20190309_163859.jpg',
            'IMG_20190424_190150957.jpg', '20190307_095921.jpg',
            '20190628_202957.jpg', '20190302_224343.jpg',
            'IMG_20191025_131559783.jpg', '20190307_122503.jpg',
            '20190306_121106.jpg', '20190628_202931.jpg',
            '20190318_202505.jpg', 'IMG_20190318_213632022.jpg',
            'IMG_20191027_171757235_BURST000_COVER_TOP.jpg', 'IMG_20191027_171943899_HDR.jpg',
            '20191027_173214.jpg', '20191102_144428.jpg',
            'IMG_20200302_132855893.jpg', 'FB_IMG_1592237807842.jpg',
            '20200228_202645.jpg', '20200228_202519.jpg',
            'IMG_20200303_104836830.jpg', 'IMG_20201107_183100777.jpg',
            'FB_IMG_1592237795311.jpg', 'IMG_20201107_165240692.jpg',
            '20200302_154724.jpg', 'IMG_20201231_200620257.jpg',
            '20200302_131804.jpg', '20200304_192053.jpg',
            'IMG_20200420_204043133.jpg', 'IMG_20200630_203125522.jpg',
            'IMG_20200604_175745092_BURST000_COVER.jpg', 'IMG_20200630_203151459.jpg',
            'FB_IMG_1592237786667.jpg', 'IMG_20201107_183827534.jpg',
            'IMG_20201231_210152356.jpg', '20200302_153036.jpg',
            'FB_IMG_1622638392701.jpg', 'IMG_20210427_193416832~3.jpg',
            'IMG_20210101_000427740.jpg', 'FB_IMG_1632309952745.jpg',
            'IMG_20210204_110633732_HDR.jpg', 'FB_IMG_1625142439174.jpg',
            'FB_IMG_1624364617101.jpg', 'IMG_20211016_192156329.jpg',
            'IMG_20210827_161853399.jpg', 'IMG_20210619_210516202.jpg',
            'IMG_20211009_214432678~2.jpg', 'IMG_20211009_214432678.jpg',
            'IMG_20211030_213911977.jpg', 'IMG_20211030_214406000.jpg',
            'IMG_20211016_192420162.jpg', 'IMG_20211023_212804831_MP.jpg',
            'IMG_20211023_213026497_BURST000_COVER_TOP.jpg', 'IMG_20211224_200902111.jpg',
            'IMG_20220316_202416061.jpg', 'IMG_20211023_213114009.jpg',
            'IMG_20211023_212749243.jpg', 'IMG_20210827_170920404.jpg',
            'IMG_20201231_211930327.jpg', 'IMG_20211030_214429829.jpg',
            'IMG_20211231_215701352.jpg', 'IMG_20220101_002509454.jpg',
            'IMG_20210619_210304614.jpg', 'IMG_20211231_214315322.jpg',
            'IMG_20220101_002411568.jpg', 'IMG_20210619_210432918.jpg',
            'IMG_20250317_103105594_HDR.jpg', 'IMG_20250315_172126655.jpg',
            'IMG_20250316_100019766.jpg', 'IMG_20250112_122159032_HDR.jpg',
            'IMG_20250315_195116499.jpg', 'IMG_20250315_135405950_HDR.jpg',
            'IMG_20250117_100757586_HDR.jpg', 'IMG_20250208_181804651_HDR.jpg',
            'IMG_20250317_130055218_HDR.jpg', 'IMG_20250315_193825669_HDR.jpg',
            'IMG_20250317_104625252_HDR.jpg', 'IMG_20250316_120423622_HDR.jpg',
            'IMG_20250316_094102825_HDR.jpg', 'IMG_20250318_102717206.jpg',
            'IMG_20250119_122705186_HDR.jpg', 'IMG_20250317_154916884_HDR.jpg',
            'IMG_20250318_103401579.jpg', 'IMG_20250208_181915030_HDR.jpg',
            'IMG_20250318_102941724.jpg', 'IMG_20250317_155727594_HDR.jpg',
            'IMG_20241231_212159875_HDR.jpg', 'IMG_20250317_161938434_HDR.jpg',
            'IMG_20250317_155155011_HDR.jpg', 'IMG_20250318_103020135.jpg',
            'IMG_20250318_102938520.jpg', 'IMG_20250318_141328789_HDR.jpg',
            'IMG_20250318_193554520_HDR.jpg', 'IMG_20250318_193704036.jpg',
            'IMG_20250319_101009902.jpg', 'IMG_20250319_100502593.jpg',
            'IMG_20250319_102816055_HDR.jpg', 'IMG_20250318_202020097_HDR.jpg',
            'IMG_20250318_214414596_HDR.jpg', 'IMG_20250320_112635396.jpg',
            'IMG_20250319_100459508.jpg', 'IMG_20250319_101405653.jpg',
            'IMG_20250319_100327478_HDR.jpg', 'IMG_20250319_195456928.jpg',
            'IMG_20250319_101925411.jpg', 'IMG_20250319_194001229_HDR.jpg',
            'IMG_20250319_114733224.jpg', 'IMG_20250320_093111653.jpg',
            'IMG_20250319_101905649.jpg', 'IMG_20250320_192926379_HDR.jpg',
            'IMG_20250320_114201806_HDR.jpg', 'IMG_20250320_091634207.jpg',
            'IMG_20250319_095010088_HDR.jpg', 'IMG_20250321_092848282.jpg',
            'IMG_20250404_104821038.jpg', 'IMG_20250319_210114516.jpg',
            'IMG_20250321_200538444_HDR.jpg', 'IMG_20250321_092549740.jpg',
            'IMG_20250320_121132080.jpg', 'IMG_20250322_031252317.jpg',
            'IMG_20250321_123500266_HDR.jpg', 'IMG_20250404_104605895_HDR.jpg',
            'IMG_20250321_192253813.jpg', 'IMG_20250322_183630015.jpg',
            'IMG_20250404_131112816_HDR.jpg', 'IMG_20250321_103734782.jpg',
            'IMG_20250320_114036941_HDR.jpg', 'IMG_20250321_122814106.jpg',
            'IMG_20250420_110759516_HDR.jpg', 'IMG_20250420_110908521_HDR.jpg',
            'IMG_20250524_195201919_HDR.jpg', 'IMG_20250524_195237883_HDR.jpg',
            'IMG_20240707_164723078_HDR.jpg', 'IMG_20240705_155605549_HDR.jpg'
        ];
        
        // Remover duplicatas
        const fotosUnicas = [...new Set(todasFotosExtraidas)];
        
        // Criar objetos de foto com categorias
        todasFotos = fotosUnicas.map(filename => {
            return {
                filename: filename,
                path: `images/${filename}`,
                categoria: categorizarFoto(filename)
            };
        });
        
        // Inicializar a galeria
        atualizarGaleria();
    };
    
    // Função para filtrar fotos
    const filtrarFotos = (categoria) => {
        if (categoria === 'todos') {
            return todasFotos;
        } else {
            return todasFotos.filter(foto => foto.categoria === categoria);
        }
    };
    
    // Função para atualizar a galeria
    const atualizarGaleria = () => {
        const galeriaContainer = document.getElementById('galeria-fotos');
        galeriaContainer.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
        
        const fotosFiltradas = filtrarFotos(filtroAtual);
        const totalPaginas = Math.ceil(fotosFiltradas.length / fotosPerPage);
        
        // Ajustar página atual se necessário
        if (paginaAtual > totalPaginas) {
            paginaAtual = totalPaginas;
        }
        if (paginaAtual < 1) {
            paginaAtual = 1;
        }
        
        // Atualizar informações de paginação
        document.getElementById('pagina-info').textContent = `Página ${paginaAtual} de ${totalPaginas}`;
        document.getElementById('pagina-info-bottom').textContent = `Página ${paginaAtual} de ${totalPaginas}`;
        
        // Habilitar/desabilitar botões de paginação
        document.getElementById('prev-page').disabled = paginaAtual === 1;
        document.getElementById('next-page').disabled = paginaAtual === totalPaginas;
        document.getElementById('prev-page-bottom').disabled = paginaAtual === 1;
        document.getElementById('next-page-bottom').disabled = paginaAtual === totalPaginas;
        
        // Calcular índices de início e fim
        const startIndex = (paginaAtual - 1) * fotosPerPage;
        const endIndex = Math.min(startIndex + fotosPerPage, fotosFiltradas.length);
        
        // Limpar loader
        galeriaContainer.innerHTML = '';
        
        // Adicionar fotos à galeria
        for (let i = startIndex; i < endIndex; i++) {
            const foto = fotosFiltradas[i];
            const galeriaItem = document.createElement('div');
            galeriaItem.className = 'galeria-item';
            galeriaItem.setAttribute('data-categoria', foto.categoria);
            galeriaItem.setAttribute('data-index', i);
            
            const img = document.createElement('img');
            img.src = foto.path;
            img.alt = `Foto ${i + 1}`;
            img.className = 'galeria-img';
            
            galeriaItem.appendChild(img);
            galeriaContainer.appendChild(galeriaItem);
            
            // Adicionar evento de clique para abrir modal
            galeriaItem.addEventListener('click', () => {
                abrirModal(fotosFiltradas, i);
            });
        }
    };
    
    // Função para abrir modal com imagem
    const abrirModal = (fotos, index) => {
        // Criar modal
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
        
        const img = document.createElement('img');
        img.src = fotos[index].path;
        
        // Adicionar controles de navegação
        const controls = document.createElement('div');
        controls.className = 'modal-controls';
        
        const prevBtn = document.createElement('button');
        prevBtn.className = 'modal-control prev';
        prevBtn.innerHTML = '&#10094;';
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (index > 0) {
                img.src = fotos[index - 1].path;
                index--;
            }
        });
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'modal-control next';
        nextBtn.innerHTML = '&#10095;';
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (index < fotos.length - 1) {
                img.src = fotos[index + 1].path;
                index++;
            }
        });
        
        controls.appendChild(prevBtn);
        controls.appendChild(nextBtn);
        
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(img);
        modal.appendChild(modalContent);
        modal.appendChild(controls);
        document.body.appendChild(modal);
        
        // Mostrar modal com animação
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        // Fechar modal ao clicar fora da imagem
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            }
        });
        
        // Navegação com teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(modal);
                }, 300);
            } else if (e.key === 'ArrowLeft') {
                if (index > 0) {
                    img.src = fotos[index - 1].path;
                    index--;
                }
            } else if (e.key === 'ArrowRight') {
                if (index < fotos.length - 1) {
                    img.src = fotos[index + 1].path;
                    index++;
                }
            }
        });
    };
    
    // Configurar filtros da galeria
    const setupGalleryFilters = () => {
        const filterButtons = document.querySelectorAll('.filtro-btn');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover classe active de todos os botões
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Adicionar classe active ao botão clicado
                this.classList.add('active');
                
                // Atualizar filtro atual
                filtroAtual = this.getAttribute('data-filter');
                paginaAtual = 1;
                
                // Atualizar galeria
                atualizarGaleria();
            });
        });
    };
    
    // Configurar paginação
    const setupPagination = () => {
        document.getElementById('prev-page').addEventListener('click', () => {
            if (paginaAtual > 1) {
                paginaAtual--;
                atualizarGaleria();
                window.scrollTo({
                    top: document.getElementById('galeria').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
        
        document.getElementById('next-page').addEventListener('click', () => {
            const fotosFiltradas = filtrarFotos(filtroAtual);
            const totalPaginas = Math.ceil(fotosFiltradas.length / fotosPerPage);
            
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                atualizarGaleria();
                window.scrollTo({
                    top: document.getElementById('galeria').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
        
        document.getElementById('prev-page-bottom').addEventListener('click', () => {
            if (paginaAtual > 1) {
                paginaAtual--;
                atualizarGaleria();
                window.scrollTo({
                    top: document.getElementById('galeria').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
        
        document.getElementById('next-page-bottom').addEventListener('click', () => {
            const fotosFiltradas = filtrarFotos(filtroAtual);
            const totalPaginas = Math.ceil(fotosFiltradas.length / fotosPerPage);
            
            if (paginaAtual < totalPaginas) {
                paginaAtual++;
                atualizarGaleria();
                window.scrollTo({
                    top: document.getElementById('galeria').offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    };
    
    // Função para animar elementos quando entrarem na viewport
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.momento-card, .mensagem-final');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('fade-in');
            }
        });
    };

    // Adicionar classe para animação inicial
    document.querySelectorAll('.momento-card, .mensagem-final').forEach(element => {
        element.classList.add('hidden');
    });

    // Executar animação no carregamento e no scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Smooth scroll para links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // Inicializar galeria
    setupGalleryFilters();
    setupPagination();
    carregarTodasFotos();
});
