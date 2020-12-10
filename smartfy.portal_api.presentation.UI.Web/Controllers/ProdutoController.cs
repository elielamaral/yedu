﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using smartfy.portal_api.domain.Entities;
using smartfy.portal_api.domain.Enums;
using smartfy.portal_api.Infra.CrossCutting.Identity.Data;
using smartfy.portal_api.presentation.UI.Web.Controllers.Api;
using smartfy.portal_api.presentation.UI.Web.DataTables;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace smartfy.portal_api.presentation.UI.Web.Controllers
{
    public class ProdutoController : BaseController
    {
        public ProdutoController(ApplicationDbContext db) : base(db)
        {
        }

        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> List(GridDataRequest request = null)
        {
            var teste = Db.Produtos.ToList();
            return Json(await Db.Produtos
                .Select(r => new
                {
                    DT_RowId = r.Id,
                    codigo = r.Codigo,
                    descricao = r.Descricao,
                    dtvencimento = r.DtVencimento.ToString("dd/MM/yyyy"),
                    isperecivel = r.IsPerecivel ? "Sim" : "Nao",
                    status = r.Status == EStatus.Ativo ? "Ativo" : "Inativo"
                }).ToDataSourceAsync(request));
        }


        [HttpGet]
        public IActionResult Create()

        {
            LoadViewBags();
            return View();
        }

        [HttpPost]
        [AutoValidateAntiforgeryToken]
        public IActionResult Create(Produto vm)
        {
            LoadViewBags();
            if (!ModelState.IsValid)
            {
                return View(vm);
            }

            Db.Produtos.Add(vm);
            Db.SaveChanges();

            LoadViewBags();
            NotifySuccess("Sucesso:", "Cadastro inserido com sucesso!");

            return RedirectToAction("Index");
        }


        [HttpGet]
        public IActionResult Edit(Guid id)
        {
            var item = Db.Produtos.FirstOrDefault(c => c.Id == id);

            if (item == null) return BadRequest();

            LoadViewBags();

            return View(item);           
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Produto vm)
        {

            if (!ModelState.IsValid)
            {
                LoadViewBags();
                return View(vm);
            }

            var partner = Db.Produtos.AsNoTracking().Where(c => c.Id == vm.Id);
            if (partner == null) return BadRequest();

            Db.Entry(vm).State = EntityState.Modified;
            Db.SaveChanges();

            LoadViewBags();
            NotifySuccess("Sucesso", "Cadastro atualizado com sucesso!");

            return RedirectToAction("Index");
        }

        [HttpGet]
        public IActionResult Delete(Guid id)
        {
            var item = Db.Produtos.FirstOrDefault(c => c.Id == id);

            if (item == null) return BadRequest();

            return View(item);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult DeleteConfirmed(DeleteViewModel vm)
        {
            var item = Db.Produtos.FirstOrDefault(c => c.Id == vm.Id);

            if (item == null) return BadRequest();

            Db.Produtos.Remove(item);
            Db.SaveChanges();


            NotifySuccess("Sucesso", "Produto removido com sucesso.");

            return RedirectToAction("Index");
        }

        private void LoadViewBags()
        {
            // Combobox/DropDownList from Static
            ViewBag.Status = new List<SelectListItem>() {
                new SelectListItem( "Ativo",Convert.ToString((int)EStatus.Ativo)),
                new SelectListItem("Inativo",Convert.ToString((int)EStatus.Inativo)),
            };

            // Combobox/DropDownList from DB
            ViewBag.ClientesSemNumero3 = Db.Clientes.Where(a => !a.CPF.StartsWith("3")).Select(c => new SelectListItem($"{c.Name} - {c.CPF}",c.Id.ToString()));
            ViewBag.ClientesComNumero3 = Db.Clientes.Where(a => a.CPF.StartsWith("3")).Select(c => new SelectListItem($"{c.Name} - {c.CPF}", c.Id.ToString()));

        }
    }
}
