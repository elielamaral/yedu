using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using smartfy.portal_api.domain.Entities;
using smartfy.portal_api.Infra.CrossCutting.Identity.Data;
using System;
using System.Linq;
using System.Net;

namespace smartfy.portal_api.services.WebAPI.Controllers
{
    /// <summary>
    /// API WhiteLabel
    /// </summary>
    [Route("api/[controller]")]
    //[Authorize]
    public class WhiteLabelController : ApiController
    {
        readonly DbSet<WhiteLabel> repository;

        /// <summary>
        /// Construtor
        /// </summary>
        /// <param name="db"></param>
        public WhiteLabelController(ApplicationDbContext db) : base(db)
        {
            repository = db.WhiteLabels;
        }

        /// <summary>
        /// Returns WhiteLabel's List
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                return Ok(repository.ToList());
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Returns one WhiteLabel
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var result = repository.FirstOrDefault(c => c.Id == id);
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Add WhiteLabel
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Add([FromBody] WhiteLabel vm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                repository.Add(vm);

                var result = Db.SaveChanges();
                return Created("", true);
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Update WhiteLabel
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public IActionResult Edit([FromBody] WhiteLabel vm)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                repository.Update(vm);
                var result = Db.SaveChanges();
                if (result != null)
                    return Ok(result);
                else
                    return BadRequest();
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        /// <summary>
        /// Delete WhiteLabel
        /// </summary>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var item = repository.FirstOrDefault(c => c.Id == id);
                repository.Remove(item);
                Db.SaveChanges();
                return Ok();
            }
            catch (ArgumentException ex)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}