/**
 * Variavel para conter o evento de click do botão "YES" do Modal
 */
var ModalYes = function () {
};

/**
 * Variavel para conter o evento de click do botão "NO" do Modal
 */
var ModalNo = function () {
};

/**
 * Variavel para conter o evento de click do botão "Ok" do Modal
 */
var ModalOk = function () {
};

/**
 * Tipos de modal
 * Message: modal com titulo, corpo e botão "OK".
 * YesNo: modal com titulo, corpo e botões "Sim" e "Não"
 */
const ModalTypes = {
    Message: `<button type='button' class='btn btn-default' data-dismiss='modal' onclick='ModalOk();'>Ok</button>`,
    YesNo: `<button type='button' class='btn btn-primary' onclick='ModalYes();'>Sim</button>
            <button type='button' class='btn btn-default' data-dismiss='modal' onclick='ModalNo();'>Não</button>`
}

/**
 * Mostra modal com gif animado de loading
 */
function showLoading() {
    $('#modalLoading').show();
}

/**
 * Esconde modal com git animado de loading
 */
function hideLoading() {
    $('#modalLoading').hide();
}

/**
 * Configura e mostra modal na tela
 * @param {any} title
 * @param {any} body
 * @param {any} type
 * @param {any} cssClass
 */
function showModal(title, body, type, cssClass) {
    $("#ModalTitulo").text(title);
    $("#ModalBody").text(body);
    //$("#ModalFooter").html(type);
    //$("#ModalHeader").addClass(cssClass);
    $("#modalMsg").modal('show');
}

/**
 * Fecha o modal
 */
function closeModal() {
    $("#ModalMensagem").modal('hide');
}

function parseServerDate(data) {
    return data.substring(0, 10);
}

$(document)
    .ajaxStart(function () {
        showLoading();
    })
    .ajaxStop(function () {
        hideLoading();
    });

var inputNumberAcceptCharacteres = "1234567890,";
var documentAcceptCharacteres = "1234567890";

var calculateDecimalPlaces = function (value, places) {
    var numberOfZeros = 0;
    var arr = [];
    var decimalValue = "";

    if (value.indexOf(",") < 0) {
        numberOfZeros = places;
        arr[0] = value;
    } else {
        arr = value.split(",");
        decimalValue = arr[arr.length - 1];
        numberOfZeros = places - decimalValue.length;
    }

    for (x = 0; x < numberOfZeros; x++) {
        decimalValue += "0";
    }

    if (numberOfZeros < 0) {
        decimalValue = decimalValue.substr(0, places);
    }

    return arr[0] + "," + decimalValue;
};

// Função que retira os pontos do CPF para enviar na API
var limpaCpf = function (cpf) {
    return cpf.replace(".", "").replace(".", "").replace("-", "");
};

$(document).ready(function () {

    // Setup - add campo de pesquisa em cada coluna
    $('.dt tfoot th').each(function () {
        var title = $(this).text();
        if (title.length > 0)
            $(this).html('<input type="search" placeholder="Filtro" />');
    });

    // Datatables
    $(".dt").each(function (i, v) {

        var columns = $(v).data('cols').split(',').map(function (o) {
            var r = { mDataProp: o, name: o };
            return r;
        });

        $(v).find('[data-format]').each(function (i, v) {
            var fmt = $(this).data('format');
            columns[$(this).index()].render = function (data) {
                switch (fmt) {
                    case "money":
                        return formatMoney(data);
                    case "date":
                        return data;
                    case "cpf":
                        return data;
                    default:
                        return data;
                }
            };
        });

        var what = $(v).data('what');
        var deleteUrl = $(v).data('delete-url');
        var editUrl = $(v).data('edit-url');
        var createUrl = $(v).data('create-url');
        var mostrarBtnNovo = $(v).data('botao-novo');
        var mostrarBtnNovoEnable = $(v).data('botao-novo-enable');
        var disableUrl = $(v).data('disable-url');
        var acoes = (typeof ($(v).data('acoes')) == "undefined") ? true : $(v).data('acoes'); //verificar se tem coluna acoes na Index
        var search = (typeof ($(v).data('search')) == "undefined" || $(v).data('search').length == 0) ? true : $(v).data('search'); //verificar se tem coluna acoes na Index

        if (acoes) {// insere ou não coluna acoes
            columns.push({
                "data": null,
                render: function (data) {
                    var ico = "fa-eye";
                    ico = $(v).data('url').includes("Team") ? "fa-camera" : "fa-eye";
                    var viewUrl = (typeof ($(v).data('view-url')) == "undefined") ? `` : ` <a href=\'${$(v).data('view-url')}/${data.dT_RowId}\' class=\'btn btn-outline-info btn-sm btn-edit\'><i class="fas ${ico}"></i ></a ></a >`;

                    var ico2 = "fa-link";
                    var viewUrl2 = (typeof ($(v).data('view-url2')) == "undefined") ? `` : ` <a href=\'${$(v).data('view-url2')}/${data.dT_RowId}\' class=\'btn btn-outline-info btn-sm btn-link\'><i class="fas ${ico2}"></i ></a ></a >`;

                    var ico3 = "fa-database";
                    var viewUrl3 = (typeof ($(v).data('view-url3')) == "undefined") ? `` : ` <a href=\'${$(v).data('view-url3')}/${data.dT_RowId}\' class=\'btn btn-outline-info btn-sm btn-database\'><i class="fas ${ico3}"></i ></a ></a >`;

                    var ico4 = "fa-eye-slash";
                    var disableUrl = (typeof ($(v).data('disable-url')) == "undefined") ? `` : ` <a href='${$(v).data('disable-url')}/${data.dT_RowId}' class='btn btn-outline-danger btn-sm btn-disable'><i class="fas ${ico4}"></i></a>`;

                    var editUrl = (typeof ($(v).data('edit-url')) == "undefined") ? `` : ` <a href='${$(v).data('edit-url')}/${data.dT_RowId}' class='btn btn-outline-info btn-sm btn-edit'><i class="fas fa-pen"></i></a></a>`;
                    var deleteUrl = (typeof ($(v).data('delete-url')) == "undefined") ? `` : ` <a href='${$(v).data('delete-url')}/${data.dT_RowId}' class='btn btn-outline-danger btn-sm btn-remove'><i class="far fa-trash-alt"></i></a>`;
                    return viewUrl + viewUrl2 + viewUrl3 + editUrl + deleteUrl + disableUrl;
                }
            });
        }

        // Botoes do menu da grid
        var btnDel = {
            text: '<i class="fas fa-fw fa-plus-circle"></i>&nbsp;&nbsp;Excluir selecionados',
            className: 'btn btn-danger btn-sm w-150',
            action: function (e, dtt, node, config) {
                var checkedIds = "";
                var selecionados = dtt.rows({ selected: true }).toArray() + "";
                if (selecionados.length > 0) {
                    var lista = selecionados.split(',');
                    for (x = 0; x < lista.length && selecionados.length > 0; x++) {
                        checkedIds += dtt.row(lista[x]).data().dT_RowId + ",";
                    }

                    if (confirm("Tem certeza que deseja deletar?")) {
                        //enviando
                        $.ajax({
                            url: deleteUrl,
                            data: {
                                checkedIds: checkedIds
                            }, method: 'POST'
                        }).done(function () {
                            window.location.href = what;
                        })
                            .fail(function () {
                                alert('Failed to save.');
                            });
                        //
                    }
                } else {
                    alert('Nenhum item selecionado.')
                }
            },
            key: {
                key: 'n',
                altKey: true
            }
        };

        var btnNovo = {
            text: '<i class="fas fa-fw fa-plus-circle"></i>&nbsp;&nbsp;<u>N</u>ovo registro',
            className: (mostrarBtnNovoEnable === false) ? 'btn btn-info btn-sm w-150 desabilitado' : 'btn btn-info btn-sm w-150',
            action: function (e, dt, node, config) {
                if (mostrarBtnNovoEnable === false) {
                    //alert('');
                    showModal("Atenção", "Sua empresa não possui Área(s) de atuação(ões) vinculado a sua conta.", "", "")
                } else {
                    window.location.href = createUrl;
                }
            },
            key: {
                key: 'n',
                altKey: true
            }
        };
        
        var btnPrint = {
            extend: 'print',
            text: 'Imprimir',
            className: 'btn btn-primary btn-sm'
        };
        var btnCopy = {
            extend: 'copy',
            text: '<u>C</u>opiar',
            className: 'btn btn-success btn-sm',
            key: {
                key: 'c',
                altKey: true
            }
        };
        var btnExcel = {
            extend: 'excel',
            className: 'btn btn-warning btn-sm'
        }
        var btnPdf = {
            extend: 'pdf',
            className: 'btn btn-danger btn-sm'
        };
        var btnSelect = [{
            text: '<i class="fas fa-fw fa-plus-circle"></i>&nbsp;&nbsp;Selecionar todos',
            className: 'btn btn-info btn-sm w-150',
            action: function (e, dt, node, config) {
                dt.rows().select();
            }
        },
        {
            text: '<i class="fas fa-fw fa-plus-circle"></i>&nbsp;&nbsp;Deselecionar todos',
            className: 'btn btn-info btn-sm w-150',
            action: function (e, dt, node, config) {
                dt.rows().deselect();
            }
        }];
        var botoes = [
            btnNovo,
            btnPrint,
            btnCopy,
            btnExcel,
            btnPdf
            //, btnSelect, btnDel
        ];
        if (mostrarBtnNovo === false) {
            botoes = [
                btnPrint,
                btnCopy,
                btnExcel,
                btnPdf
                // , btnSelect, btnDel
            ];
        }

        var t = $(v).dataTable({
            lengthMenu: [25, 50, 75, 100],
            dom: 'Bfrtip',
            bProcessing: false,
            bServerSide: true,
            bSearch: false,
            "ajax": {
                "url": $(v).data('url'),
                "type": "POST"
            },
            "rowCallback": function (row, data) {
                if (typeof (rowCallBack) != "undefined") {
                    rowCallBack(row, data);// isso daqui serve para criarmos um rowcallback diferente para cada view
                    // se adicionarmos uma funccao chamada rollcalback na pagina index ela sera executada aqui. agora que vi, rollcakback esta errado
                }
                $(row).find('.btn-remove').unbind('click').click(function () {
                    window.location.href = deleteUrl + "/" + data.dT_RowId;
                });
                $(row).find('.btn-edit').unbind('click').click(function () {
                    window.location.href = editUrl + "/" + data.dT_RowId;
                });
            },
            colReorder: true,
            autoFill: true,
            keys: true,
            select: true,
            rowReorder: false,
            buttons: botoes,

            columnDefs: [],
            "language": {
                "sEmptyTable": "Nenhum registro encontrado",
                "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
                "sInfoFiltered": "(Filtrados de _MAX_ registros)",
                "sInfoPostFix": "",
                "sInfoThousands": ".",
                "sLengthMenu": "_MENU_ resultados por página",
                "sLoadingRecords": "Carregando...",
                "sProcessing": "<div class=\"loading- image\"><img src = \"~/../images/loading.png\" style = \"width: 180px;\" /></div >",
                "sZeroRecords": "Nenhum registro encontrado",
                "sSearch": "Pesquisar",
                "oPaginate": {
                    "sNext": "Próximo",
                    "sPrevious": "Anterior",
                    "sFirst": "Primeiro",
                    "sLast": "Último"
                },
                "oAria": {
                    "sSortAscending": ": Ordenar colunas de forma ascendente",
                    "sSortDescending": ": Ordenar colunas de forma descendente"
                },
                "select": {
                    "rows": {
                        "_": "Selecionado %d linhas",
                        "0": "Nenhuma linha selecionada",
                        "1": "Selecionado 1 linha"
                    }
                }
            },

            columns: columns,
            fnDrawCallback: function () {
                //bindButton($(".btn-edit"));
            },
            preInit: function () {
                $("body").css("cursor", "wait");
            },
            initComplete: function () {
                $("body").css("cursor", "default");
                // Apply the search - pesquisa em cada coluna
                t.api().columns().every(function () {
                    var that = this;
                    $('input', this.footer()).on('keyup change clear', function () {

                        //TODO: Revisar Filtro Por Coluna via API
                        //if()
                        $(".dt").DataTable().search(this.value, false, true).draw();

                    });
                });
                //
            },
        });

        //Hide Search Button
        if (!search) {
            $('#dt_filter').hide();
        }
    });

    $('.decimal-input').on("blur", function (ev) {
        $(ev.target).val(calculateDecimalPlaces($(ev.target).val(), 2));
    });

    $('.decimal-input').on("keypress", function (ev) {
        if (inputNumberAcceptCharacteres.indexOf(ev.key) < 0) ev.preventDefault();
    });

    $('.documento').on("focus", function (ev) {
        var currval = $(ev.target).val();
        var newVal = currval.replace(".", "").replace(".", "").replace("-", "");
        $(ev.target).val(newVal);
    });

    $('.documento').on("blur", function (ev) {
        var value = limpaCpf($(ev.target).val());

        if (value.length !== 11 && value.length !== 15) {
            $(ev.target).val('');
            $('#modalDocumentoInvalido').modal();
        }

        if (value.length === 11) {
            var currval = $(ev.target).val();
            var maskedVal = currval.substr(0, 3) + "." + currval.substr(3, 3) + "." + currval.substr(6, 3) + "-" + currval.substr(9, 2);
            $(ev.target).val(maskedVal);

            var cpf = currval.replace(".", "").replace(".", "").replace("-", "");
            onCpfBlur(cpf);
        }

        if (value.length === 15) {
            var cns = $(ev.target).val();

            onCnsBlur(cns);
        }
    });

    $('.documento').on("keypress", function (ev) {
        if (documentAcceptCharacteres.indexOf(ev.key) < 0) ev.preventDefault();
        if ($(ev.target).val().length >= 15) ev.preventDefault();
    });

    //Campo filtro
    $('.documento-filtro').on("focus", function (ev) {
        var currval = $(ev.target).val();
        var newVal = currval.replace(".", "").replace(".", "").replace("-", "");
        $(ev.target).val(newVal);
    });

    $('.documento-filtro').on("blur", function (ev) {
        var value = limpaCpf($(ev.target).val());

        if (value.length !== 11 && value.length !== 15) {
            $(ev.target).val('');
            $('#modalDocumentoInvalido').modal();
        }

        if (value.length === 11) {
            var currval = $(ev.target).val();
            var maskedVal = currval.substr(0, 3) + "." + currval.substr(3, 3) + "." + currval.substr(6, 3) + "-" + currval.substr(9, 2);
            $(ev.target).val(maskedVal);

            var cpf = currval.replace(".", "").replace(".", "").replace("-", "");
        }

        if (value.length === 15) {
            var cns = $(ev.target).val();
        }
    });

    $('.documento-filtro').on("keypress", function (ev) {
        if (documentAcceptCharacteres.indexOf(ev.key) < 0) ev.preventDefault();
        if ($(ev.target).val().length >= 15) ev.preventDefault();
    });

    $(".dashpercent").each(function () {
        $(this).mask("999", { reverse: true });

        if ($(this).data('value'))
            $(this).val($(this).data('value'));
        else
            $(this).val(null);
        
        $(this).keyup(function () {
            if ($(this).val() > $(this).data('limit'))
                $(this).val($(this).data('limit'));
        });
    });
});
